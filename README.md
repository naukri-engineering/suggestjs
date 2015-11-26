# Suggest.js

It's a lightweight javascript library which enable users to quickly find and select from a pre-populated list of values as they type, leveraging searching and filtering

This Autocomplete component provides suggestions while you type into the input field.

-------------------------------------------------------
-------------------------------------------------------

## Demo
[Click me --:](http://naukri-engineering.github.io/suggestjs/)

-------------------------------------------------------

## Library Support
* jQuery
* Zepto

-------------------------------------------------------

## Browser Support
* Internet Explorer 8+
* Chrome 10+
* Firefox 3.5+
* Safari 4+
* Opera 11+

-------------------------------------------------------

## Dependencies
* nCache.js
* JSONPErrorSupport.js
* cookie.js (required only if prefData.userCookie parameter enabled)

-------------------------------------------------------

# Getting Started
* Include the [Style Sheet](https://raw.githubusercontent.com/naukri-engineering/suggestjs/gh-pages/c/suggest.css) for suggestor design.
* Include the suggestor [javascript library](https://raw.githubusercontent.com/naukri-engineering/suggestjs/gh-pages/j/suggest_v1.0.0.min.js).
* Add required HTML [HTML](https://gist.github.com/naukri-engineering/4fdff41ab34e1996cf6b).

-------------------------------------------------------

## Features
* Autocomplete: Displays suggestions to end-users as they type

 ![picture](http://saeed3e.github.io/suggestjs/i/autoComplete.PNG)
 
* Highlights query matches within the suggestion

* Support single or Multiple Datasets/groups

* Triggers custom events

* **Prefetching** ( using Local Storage): 
    Prefetched data is fetched and processed on initialization. If the browser supports local storage, the processed data will be cached there to prevent additional network requests on subsequent page loads.

* Intelligent caching(URL based cashing support)
* Autocorrect feature (suggest autocorrect suggestions if user type wrong/mispell word)
    ![picture](http://saeed3e.github.io/suggestjs/i/autoCorrect.PNG)

* Related concept (show related suggestions when user press commma or select any record)
 ![picture](http://saeed3e.github.io/suggestjs/i/relatedConcept.PNG)

* Show User's History for quick selection
 ![picture](http://saeed3e.github.io/suggestjs/i/recenthistory.png)

* UserBased data personalization support by userID and history keywords

* Track user's interation: Record all user's history like what user select and at which location. kinldy refer below listed JSON format for more details

```javascript
{
    "lgData": {
        "kwdsugg": {
            "Events": [
                {
                    "type": "ac",
                    "acFor": "ja",
                    "sel": "java fresher",
                    "pos": 6,
                    "cached": true
                },
                {
                    "type": "rc",
                    "rcFor": "java fresher",
                    "sel": "Oracle",
                    "pos": 5,
                    "cached": false
                },
                {
                    "type": "rc",
                    "rcFor": "java fresher",
                    "sel": "Servlets",
                    "pos": 7,
                    "cached": false
                }
            ],
            "sId": "5000",
            "appId": 108,
            "platform": "mobile",
            "formId": "searchForm"
        },
        "locsugg": {
            "Events": [
                {
                    "type": "ac",
                    "acFor": "de",
                    "sel": "delhi/ncr",
                    "pos": 2,
                    "cached": false
                },
                {
                    "type": "ac",
                    "acFor": "pu",
                    "sel": "pune",
                    "pos": 1,
                    "cached": false
                }
            ],
            "appId": 108,
            "platform": "mobile",
            "formId": "searchForm"
        }
    }
}

Where:
"ac":       autocomplete
"acFor":    autocomplete for
"sel":      selection
"pos":      position
"cached":   true-> data served from localCache and false -> data served from server
"rc":       related concepts
"rcFor":    related Concepts for
"sId":      source Id
"appId":    application Id
"platform": can be Desktop/Mobile
"kwdsugg":  suggestor Id
"lgData":   fixed value
```        

-------------------------------------------------------

## Data Flow Diagram
![picture](http://saeed3e.github.io/suggestjs/i/technicalArchitecture.PNG)


# Usage

### HTML

```HTML
<div class="suggest">
    <div class="sWrap">
        <div class="iconWrap"><a class="sSearch"></a><a class="sCross"></a><span class="nLoder"></span></div>   
        <div class="inpWrap">            
            <input class="sugInp" type="text" placeholder="Search"> 
        </div>            
    </div>
</div>
```

### Call

```javascript
    
$('.suggest').suggestor({
    domain: "http://suggest.naukimg.com/demo",  // mendatory parameter
    category: {                                 // mendatory parameter
        'location': "Locations"                 // location --> bucket/category and Locations --> heading/title
    }
});
```


### Parameters (Options)


Name  | Discription
----|-----
appId | Corresponds to the application which use auto-suggestor.
autoComplete | URL which return autocomplete data as per query.
checkVersion |  URL which return current version of autoSuggestor library. 
category | skill, title, location, company, institute (all are case sensitive and can be used as per project requirement). Note: At least one field is mandatory and it can be any one.
getRelatedConcepts | It's a callback function to get RC list.
grouping (Default: true)| Enable/Disable data to show in a group/buckets or not.
multiSearch (Default: false)|  if set true then user can search multiple records by add comma before next query string.
maxSuggestions | Set the maximum number of suggestion shown corresponding to each data set (Default:10)
maxHeight | Set the maximum height of suggestor layer, if no of suggestions exceed form the current drop layer height then scroll will show.
onSelect | it's a callback function which trigger when and suggestion choose from the suggestion drop layer.
placeholder (Default :false)| if set true then set the placeholder for browser which does not support placeholder.
prefetch | URL which return prefetch data for local Storage. Prefetch data is fetched and processed on initialization. If the browser supports local storage, the processed data will be cached to prevent additional network requests on subsequent page loads. WARNING: While it's possible to get away with it for smaller data sets, prefetch data isn't meant to contain entire data sets. Rather, it should act as a first-level cache for suggestions. If don't keep this warning in mind, you run the risk of hitting local storage limits.
relatedConceptsCategory (Mandatory)| category for related concepts suggestions.
relatedConcept_dataLayer (default : true) | to prevent show RC list to user , pass RC object data to callback function "getRelatedConcepts"
relatedConceptsLimit (Default: none)| Related suggestions will stop when counter reached to it's maximum value.
relatedConcept | URL which return related concepts JSON data.  (keyboard handling: Use CTRL+ right Arrow Key to switch to arrow)
returnFocus (Default : false) | to disable focus on input field after selection.
sourceId (optional)| it's a subset of appId. It tells from which page(under appId) a request is being made.
startSearchAfter (Default: 1) |  (As user type search begains), It set the limit after how many character search begins.
showRelatedConcept (Default :true)|  To disabled related concepts.
showDataOnFocus (optional) |  to show data when user focus/click on suggestor box
suggestOnClick (optional) (Default : true)| to disabled related concepts feature 
showTitleForSingleBucket (Default:false) | to show title if data is only for one bucket
titleForSingleBucket (Default : 'Last Searched Keywords') | tittle for single bucket if required
trackUserInteraction (optional) (Default : false)| to track user interaction with the suggestor. It capture user selection and position.
url | An object contains group of URLs(autoComplete, relatedConcept, checkVersion, prefetch)
whiteListSpecialChar (Default :none)| To enable special character in query





### url

url: This object contains group of URLs. (autoComplete, relatedConcept, checkVersion, prefetch)

By default suggest.js get data from URLs with listed below format

```javascript
checkVersion    -->  domain + '/suggest/v?',
prefetch        -->  domain + '/suggest/prefetch?'
autoComplete    -->  domain + '/suggest/autocomplete?',
relatedConcept  -->  domain + '/suggest/autoconcepts?',
```

But you can also overwrite above format by "url" parameter
e.g.

```javascript
var myCustomURLs = {
        checkVersion:   'http://mydomain.com/version?',
        prefetch:       'http://mydomain.com/prefetchData?'
        autoComplete:   'http://mydomain.com/autocompelteData?',
        relatedConcept: 'http://mydomain.com/reletedConceptData?',
    }


$('.suggest').suggestor({
    domain: "http://mydomain.com",  // mendatory parameter
    url: myCustomURLs               // to overwrite defaults format of url with your custom url format
});
```

### category

category | skill, title, location, company, institute (all are casesensitive and can be used as per project requirement). Note: At lest one field is mendatory and it can be any one.

```javascript
$('.suggest').suggestor({
    domain: "http://mydomain.com",  // mendatory parameter
    category: {
        'skill': "Skills",                          // at least one category must be defined
        'title': 'Title'
    }
});
```

### appId

appId | Corresponds to the application which use auto-suggestor.

```javascript
$('.suggest').suggestor({
    domain: "http://mydomain.com",  // mendatory parameter
    appId : 1021
});
```

### sourceId

sourceId (optional)| it's a subset of appId. It tells from which page(under appId) a request is being made.

```javascript
$('.suggest').suggestor({
    domain: "http://mydomain.com",  // mendatory parameter
    sourceId : 21
});
```

### multiSearch

multiSearch (Default: false)|  if set true then user can search multiple records by add comma before next query string.

```javascript
$('.suggest').suggestor({
    domain: "http://mydomain.com",  // mendatory parameter
    multiSearch : true
});
```


### startSearchAfter

startSearchAfter (Defualt: 1) |  (As user type search begains), It set the limit after how many character search begins.

```javascript
$('.suggest').suggestor({
    domain: "http://mydomain.com",  // mendatory parameter
    startSearchAfter : 2
});
```

### maxSuggestions

maxSuggestions | Set the maximum number of suggestion shown corresponding to each data set (Default:10)

```javascript
$('.suggest').suggestor({
    domain: "http://mydomain.com",  // mendatory parameter
    maxSuggestions : 5
});
```

### placeholder

placeholder (Default :false)| if set true then set the placeholder for browser which does not support placeholder.


```javascript
    $('.suggest').suggestor({
        url: dataURLs,
        prefetchKey: '__infoEdge/json/prefetch',
        placeholder:true
    });
```

### onSelect

onSelect | it's a callback function which trigger when and suggestion choose from the suggestion drop layer.

```javascript
$('.suggest').suggestor({
    domain: "http://mydomain.com",  // mendatory parameter
    onSelect : function(){
                console.log('Hello, Did you call me ?')
    }
});
```


### showRelatedConcept

showRelatedConcept (Default :true)|  To disabled related concepts suggestions.

```javascript
$('.suggest').suggestor({
    domain: "http://mydomain.com",  // mendatory parameter
    showRelatedConcept:false
});
```

### whiteListSpecialChar

whiteListSpecialChar (Default :none)| To enable special character in query

```javascript
$('.suggest').suggestor({
    domain: "http://mydomain.com",  // mendatory parameter
    whiteListSpecialChar: '#+./'
});
```

### relatedConceptsCategory

relatedConceptsCategory

```javascript
$('.suggest').suggestor({
    domain: "http://mydomain.com",  // mendatory parameter
    relatedConceptsCategory: {
        'skill': 'Skills'
    }
});
```

### relatedConceptsMaxCounter

relatedConceptsMaxCounter (Default:none)| Related suggestions will stop when counter reached to it's maximum value.

```javascript
$('.suggest').suggestor({
    domain: "http://mydomain.com",  // mendatory parameter
    relatedConceptsMaxCounter: 5
});
```

### grouping

grouping (Default:true)| Enable/Disable data to show in a group/buckets or not.

```javascript
$('.suggest').suggestor({
    domain: "http://mydomain.com",  // mendatory parameter
    grouping : false
});
```
### suggestOnClick

suggestOnClick (optional): to disabled related concepts feature 

```javascript
$('.suggest').suggestor({
    domain: "http://mydomain.com",  // mendatory parameter
    suggestOnClick : false
});
```
### trackUserInteraction

trackUserInteraction (optional): to track user interaction with the suggestor. It captaure user selection and position.

```javascript
$('.suggest').suggestor({
    domain: "http://mydomain.com",  // mendatory parameter
    trackUserInteraction : true
});
```

### getTrackUserInteractionData

getTrackUserInteractionData (optional): to get user's interation data in this function.

```javascript
$('.suggest').suggestor({
    domain: "http://mydomain.com",  // mendatory parameter
    getTrackUserInteractionData function(data) {
        console.log(data)
    }
});
```

### showDataOnFocus

showDataOnFocus (optional): to show data when user focus/click on suggestor box

```javascript
$('.suggest').suggestor({
    domain: "http://mydomain.com",  // mendatory parameter
    showDataOnFocus :[{
        "displayTextEn": "Java"
    }, {
        "displayTextEn": "PHP"
    }, {
        "displayTextEn": "MySQl"
    }]
});
```


### Author
[Mohd Saeed Khan](http://www.saeed3e.com)
