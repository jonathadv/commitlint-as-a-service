# commitlint-as-a-service

Use [commitlint](https://github.com/conventional-changelog/commitlint) with [@commitlint/config-conventional](https://www.npmjs.com/package/@commitlint/config-conventional) rules as a http service.

## Project setup

`npm install`

## Run server

`$ node app`

or

`$ nodemon app`

## Call with JSON Response

`GET /?msg=<commit message>`

```bash
$ curl -G http://localhost:3333/json --data-urlencode "msg=feat: test" | jq

{
  "valid": true,
  "errors": [],
  "warnings": [],
  "input": "feat: test"
}
```

```bash
$ curl -G http://localhost:3333/json --data-urlencode "msg=FeaT: test" | jq

{
  "valid": false,
  "errors": [
    {
      "level": 2,
      "valid": false,
      "name": "type-case",
      "message": "type must be lower-case"
    },
    {
      "level": 2,
      "valid": false,
      "name": "type-enum",
      "message": "type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]"
    }
  ],
  "warnings": [],
  "input": "FeaT: test"
}
```

## Call with Text Response

`GET /txt?msg=<commit message>`

```bash
$ curl -G http://localhost:3333/text --data-urlencode "msg=feat: test"

ok

```

```bash
$ curl -G http://localhost:3333/text --data-urlencode "msg=FeaT: test"

⧗   input: FeaT: test
✖   type must be lower-case [type-case]
✖   type must be one of [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test] [type-enum]

✖   found 2 problems, 0 warnings

```
