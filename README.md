# ChConvert

A small chinese charset convertor using OpenCC and Walk. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

After downloading, run

```
npm install
```

### Run

Just run the convert.js

```
node convert.js $DIRECTORY $OpenCC_JSON_Name
```

Example

```
node convert.js ../dir t2s
```

For $OpenCC_JSON_Name, please visit [OpenCC](https://www.npmjs.com/package/opencc) for more options.

### Skip Directory

Configure skipped.json to skip the directories you don't want to tamper with.

```
[
    "node_modules", 
    "assets", 
    ".git"
]
```

By default, 3 directories as shown above will be ignored.


## Built With

* [OpenCC](https://www.npmjs.com/package/opencc) - Charset conversion
* [Walk](https://maven.apache.org/) - Walk file






