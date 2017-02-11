# NoRefer

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
