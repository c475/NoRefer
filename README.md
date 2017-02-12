# NoRefer

https://chrome.google.com/webstore/search/NoRefer

##Enter one header and optional replacement value per line

###To block an HTTP header from your requests:
```javascript
Referer
```

###To spoof an HTTP header in your requests:
```javascript
Referer: https://somegarbagewebsite.com/
```

###Exclude all headers starting with "Accept" (the # signals a Regular Expression):
```javascript
#Accept.*
```

###Make all headers starting with "Accept" a particular value:
```javascript
#Accept.*: SomeValue
```

###All regular expressions are generally permitted, except ones containing ':' because it breaks the parser


##A full example config and explanation of what it does:

```javascript
Accept.*: SomeValue
Referer
User-Agent: CoolAgent4000
Co.*
```

####1. All headers starting with "Accept" will have the value "SomeValue"
####2. "Referer" will be removed from your request headers
####3. "User-Agent" headers will have the value "CoolAgent4000"
####4. All headers starting with "Co" will be removed from your request headers
