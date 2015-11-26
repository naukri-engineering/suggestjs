// JavaScript Document
customScroll = (function(){	
	
	var constant = {
						anchorScrollSpeed:10,	
						pageScrollSpeed: 20,
						clientX:0,
						clientY:0,
						type : {0:'vertical',1:'horizontal'},
						vertical:{
									func:'height',
									css1:'top',
									css2:'height',
									sSize:'scrollHeight',
									sStart:'scrollTop'
								},
						horizontal:{
									func:'width',
									css1:'left',
									css2:'width',
									sSize:'scrollWidth',
									sStart:'scrollLeft'
								}
					};
					
	var MOUSEEVENTS = function(){
		
			var onPinch =  function(dir,elem,_this,e){
				
				var func = _this.scrollToward;
				var scrollSpeed  = 0;			
				var bar_curr = _this[dir]['bar'][0]
				
				if(elem.hasClass('anchor')){						
					scrollSpeed = constant.anchorScrollSpeed;
					var value = elem.hasClass('head')?-scrollSpeed:scrollSpeed;							
				}
				else{
					var barRect = _this[dir]['bar'].currObj().getBoundingClientRect();
					var flag_move = (dir=='vertical'?e.clientY<barRect.top:e.clientX<barRect.left)?'head':'foot';						
					scrollSpeed = constant.pageScrollSpeed;
					var value = (flag_move=='head')?-scrollSpeed:scrollSpeed;							
				}
				
				func.interval = setInterval(function(){
					if( document.elementFromPoint(constant.clientX,constant.clientY)==bar_curr){
						clearInterval(proto.scrollToward.interval);
						return;
					}
					_this.scrollToward(dir,value)
				},100)
			}
			
			var onDragStart = function(dir,obj){
				
				constant.drag = {					
					dir:dir,
					obj:obj,
					prev_clientX : constant.clientX,
					prev_clientY : constant.clientY						
				}
			}
		
			var mouseEvents = function(dir){
				var _this = this;
			    
				this[dir]['scroll'].addEvent('mousedown',function(e,dir){
					var elem = $n(e.target||e.srcElement);
					if(elem.hasClass('bar') || elem.hasClass('anchor'))
						dir = elem.parent().attr('class').match(/vertical|horizontal/);
					else
						dir = elem.attr('class').match(/vertical|horizontal/);
					if(elem.hasClass('bar'))
						onDragStart(dir,_this);
					else
						onPinch(dir,elem,_this,e);					
				});						
			}
			
			return {
				mouseEvents:mouseEvents
			}
		}


	var proto = {
		type : {0:'vertical',1:'horizontal'},
		injectStructure : function(){
			//Add Structure
			var frag = document.createDocumentFragment();						
			var childnodes = this.elem[0].childNodes;
			
			while(childnodes.length)
				frag.appendChild(childnodes[0]);
			
			this.cover = $n('<div>').addClass('cover');
			this.content = 	$n('<div>').addClass('matchParent content');					

			this.content.append($n(frag));
			var obj = {
				'minWidth':this.elem.getCSS('min-width'),
				'maxWidth':this.elem.getCSS('max-width'),
				'minHeight':this.elem.getCSS('min-height'),
				'maxHeight':this.elem.getCSS('max-height')
			}
			this.content.css(obj);
			
			this.cover[0].setAttribute('onscroll','this.scrollLeft=this.scrollTop=0');			
			this.cover.append(this.content);
			this.elem.append(this.cover);
			
			
			function foo(dir){
				this[dir] = {
					scroll : $n('<div>').addClass('csb matchParent '+dir),
					head: $n('<div>').addClass('matchParent anchor head'),
					foot : $n('<div>').addClass('matchParent anchor foot'),
					bar : $n('<div>').addClass('bar')
				}
				this[dir].scroll.append(this[dir].head).append(this[dir].bar).append(this[dir].foot);
				this.cover.append(this[dir].scroll)
				console.log('get anchor size need to be soft coded')
				this.anchorSize = 25//this[dir].head[proto.props[dir]['func']]();
				this[dir].bar[0].style[this.getProperty(dir,'css1')] = this.anchorSize+'px';
			}
			
			foo.call(this,this.type[0])
			foo.call(this,this.type[1])		
					
		},
		getPaneSize : function(dir){
			var _ = this.getProperty(dir,'func');
			var asize = this[dir].head[_]();
			var psize = this[dir].scroll[_]()-asize*2;			
			return {			
				aSize:asize,
				pSize: (psize>-1)?psize:0
			}
			
		},
		/*
		*	Sets Bar Height
		*	Sets Ratio
		*/
		setRatio : function(dir){

			var css1 = this.getProperty(dir,'css1');
			var css2 = this.getProperty(dir,'css2');			
			var sSize = this.getProperty(dir,'sSize');
			var sStart = this.getProperty(dir,'sStart');
			
			var obj = this.getPaneSize(dir);	
			//No Min size for scroll bar has been set				
			var bSize = Math.pow(obj.pSize,2)/this.content[0][sSize];			
			this[dir].bar[0].style[css2] = bSize+'px';	
			
			//I am stuck here width is not gettin applied

			this.content[0][sStart] = this.content[0][sSize]				
			this[dir].maxsSize = this.content[0][sStart];			
			this.content[0][sStart] = 0;	
			this[dir].RATIO = (obj.pSize- bSize)/this[dir].maxsSize;			
								
		},
		isScrollable : function(dir){
			var sSize = this.getProperty(dir,'sSize');						
			sSize =   this.content[0][sSize];
			
			var cSize = this.getProperty(dir,'func');
			cSize = this.content[cSize]();			
					
			return sSize>cSize;							
		
		},
		onScrollHeightUpdate : function(dir){
			if(this.isScrollable(dir))
			{
				this[dir].scroll.show();
				this.setRatio(dir);	
			}
			else
				this[dir].scroll.hide();	
		},
		setBarStart : function(dir,value){
			var css1 = this.getProperty(dir,'css1');
			var func = this.getProperty(dir,'func');
		
			value  = (value * this[dir].RATIO)+ this.anchorSize;
			
			this[dir].bar[0].style[css1] = value+'px';
		},
		/*
		*	May be due to scroll height change
		*	May be due to scrolling
		*/
		onScrollChange : function(){
			var obj = this.getProperty('type');

			for(key in obj)
			{				
				var val = obj[key]				
				
				//Get prevs state variables
				var _sSize = this[val]._sSize || 0;
				var _sStart = this[val]._sStart || 0;
				
				//Get current state variables
				var sSize = this.content[0][this.getProperty(val,'sSize')];
				var sStart = this.content[0][this.getProperty(val,'sStart')];				
				if(sSize!=_sSize)
				{
					this.onScrollHeightUpdate(val)
					this[val]._sSize = sSize;
				}
				if(sStart!=_sStart)
				{
					this.setBarStart(val,sStart)
					this[val]._sStart = sStart;
				}
			}			
		},
		getProperty : function(path,prop){
			return prop?constant[path][prop]:constant[path];
		},
		scrollTo: function(dir,val){
			var prop = this.getProperty(dir,'sStart');
			this.content[0][prop] = val;
		},
		scrollToward: function(dir,val){
			var prop = this.getProperty(dir,'sStart');			
			this.content[0][prop]+= val;
		},
		attachEvents : function(){			
			var scObj = this;			
			this.content.addEvent('scroll',function(e){				
				scObj.onScrollChange();									
			});
			
			var type = constant.type;
			
			for(key in type){
				var dir = type[key];								
				this.mouseEvents(dir);					
			}
			//Hide and show of scrollbar
					
			
/*			$n('.cover').mouseover(function(){
				console.log('mouseover')
			},true);			*/
		}	
	}
	
	var csb_utils = function(elem,obj)
	{
		elem.csb = {
			scrollToHead : function(dir){
			},
			scrollToFoot : function(dir){
			},
			scrollTo : function(){
			},
			remove : function(){
			}	
		};		
	}
	
	var csb = function(elem){
		this.elem = elem;
		this.injectStructure();		
		this.attachEvents()
		csb_utils(elem[0],this);		
		
	}
	
	//Combining Modules into proto
	var extendArr = MOUSEEVENTS()

	for(key in extendArr){
		proto[key] = extendArr[key];
	}
	csb.prototype = proto;
	
	var init = function(){
		var list = $n('.nScroll')
		for(var i=list.length-1;i>-1;i--){
			new csb(list.eq(i))
		}				
	
		list.toggleClass('nScroll','nScrollable');	

	}
	//Basic Event
	$n(document).addEvent('mouseup',function(e){
			constant.drag = null;
			clearInterval(proto.scrollToward.interval);
	}).addEvent('mousemove',function(e){
		constant.clientX = e.clientX;
		constant.clientY = e.clientY;
		
		if(constant.drag){

			var diffX = constant.clientX - constant.drag.prev_clientX;
			var diffY = constant.clientY - constant.drag.prev_clientY;			

			var _this = constant.drag.obj;
			var  dir  = constant.drag.dir;
			
			
			var value = ((dir=='vertical')?diffY:diffX)/_this[dir].RATIO;
			
			_this.scrollToward(constant.drag.dir,value)
			
			constant.drag.prev_clientX = constant.clientX;
			constant.drag.prev_clientY = constant.clientY;			
		}
	})
	
	return {init:init}
}())