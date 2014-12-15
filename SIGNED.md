##### Signed by https://keybase.io/alistairjcbrown
```
-----BEGIN PGP SIGNATURE-----
Version: GnuPG v1.4.14 (GNU/Linux)

iQEcBAABAgAGBQJUjjGbAAoJEJEOHi8Q7zzzaUUH/1McsUl1HdWWukLBd1j3mcsB
lPfTrfFwno+pvXuMR91+QO29DhRWc9R43ipo3qJ1+PDofzql2HjDAyFSn7gcR6wV
damBeGcIxImJKJU0KbkBh3y6VvJWT0hmqsxiCCtK2duoDtu1zFi+8kDmSVscaWin
IPfGCQLgo3rdHnXJe3xYPzkdXUAViIP4htIInR+tiVwweEwPtsn+j57GYw9U53eB
LIiuT9UhHvqssV8o77T4XFfO4i5Yrj29zqWeyqWpoDYpgQu59GOUFs7OzETJ1+XD
mJkfAV+r1xbhYvrWzntS44DvRnJhUdfNcpr1v8aAVGXJZjoBz7zvuSQszR7hBI4=
=Nsl4
-----END PGP SIGNATURE-----

```

<!-- END SIGNATURES -->

### Begin signed statement 

#### Expect

```
size  exec  file                       contents                                                        
            ./                                                                                         
27            .gitignore               403de3e1c73edcfaa2f46ff6146f414ddcaeed97717a02af53733b31c2dec963
113           .travis.yml              d48aa039d84d35164a8b29ecb75ac4787f974c248a4b09d1cb7587bbc1e15924
2923          Gruntfile.js             b55cdad7a6ffc662cb79c6ffd652dfd284132698997301a93433b1231a7c3a26
1081          LICENSE.md               0e7bf3c5852cb41c33a213aed24d4321df388f819323e0027c3c91a009429df8
535           README.md                ad6302337419ce42ca25539acf769c68e0596a05f4f407d170fb96037f806f2e
              config/                                                                                  
106             app.json               aa191f0bb9f670e023dea8708fd14d5a915a73e3913ef4a4231bfb5bedb4ff9c
603             requirejs.json         7735e1df9c9d9db6adc93f9b29525b59e26797b0097110c26c4338133aaa2e41
389           index.js                 0876663173df2507b528bae0ae3743f98804ae8a81eb8c68707800690182d3f1
1158          package.json             b7089515a3379b4c931a950ab8b8a26f7d61c05667bd75726d88ad2cae6ed861
              src/                                                                                     
111             README.md              7b1b44318066880ada5881989046116beac4adcf6953141109992573fd66e684
321             app.js                 0c64162bf6a662e6b19e803be366961d3fa59fd2ed44202c489f8ff691bc0dfe
                lib/                                                                                   
                  http-server/                                                                         
124                 README.md          c11a7898d18d28d2d587fca367abce8ff3fed8d9382f6f85413e1d107daf3a55
312                 index.js           56dce55946390e6dfa752bf5b4934c49fa0f71a605cb25bcfbf6e3ba4a04d2a1
                    tests/                                                                             
1506                  index.test.js    8b64c03ba4fefe9eee163dd0fd16802b0da88d0a54c5d05a7f7a0774abc94a2c
                  redis-client/                                                                        
0                   README.md          e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
83                  index.js           c35a42886251aeb1a0f4224019743505f7345920720cb5e92ac7b844916f1834
                    tests/                                                                             
                  websocket-server/                                                                    
47                  README.md          c5eec1264ef9c60f67212bcc0b9e4d114a0c7d4c6e63426f08f87cc18fd7482a
651                 index.js           f6a630262e75db6d85191b6833b3b225aea4e3201370e4b7429591097b2c824c
                    tests/                                                                             
1377                  index.test.js    d54e310337780eb8b349767536ff99aa1a0f9cb4d6423f8ad06974989689bd61
                tests/                                                                                 
                  fixtures/                                                                            
                  mocks/                                                                               
572                 http.js            20f08495a2b7ce09847a1a6793790c94a502f4f9fa4d5d1a0417ffb0a8284f1b
356                 primus.js          6350878c1eefc2fd9736ea24768c8026b55eefba3a929d0bced608c3c1e24532
783               test-environment.js  635ca37453cb282789761bc52a2f4920ed808e9c8e122a566fc87ac81e48a524
                utils/                                                                                 
                  authorize/                                                                           
189                 README.md          3e91c063d6e9a7d566c16ac7975434a7f34ccecc5deb0b7c7f10cb0197b0813b
250                 index.js           9a3ae0ccf3915a8f8d17c788172fabba521399a2428bf3512d51d0b76a125f6f
                    tests/                                                                             
436                   index.test.js    5d15c488e7b50e91d0d47ce96817a98c4617927cc7ee9518226f56b36de1d7fa
292               config.js            1d983a5cba047eb268c2e1739a5575784e6d52c586bc2e9b106aff39cc3f16b3
604           test.runner.js           e39c8319d1d026c9260ea88985a3055ed02a4566106cff195ec01bdf3673c41f
```

#### Ignore

```
/SIGNED.md
```

#### Presets

```
git      # ignore .git and anything as described by .gitignore files
dropbox  # ignore .dropbox-cache and other Dropbox-related files    
kb       # ignore anything as described by .kbignore files          
```

<!-- summarize version = 0.0.9 -->

### End signed statement

<hr>

#### Notes

With keybase you can sign any directory's contents, whether it's a git repo,
source code distribution, or a personal documents folder. It aims to replace the drudgery of:

  1. comparing a zipped file to a detached statement
  2. downloading a public key
  3. confirming it is in fact the author's by reviewing public statements they've made, using it

All in one simple command:

```bash
keybase dir verify
```

There are lots of options, including assertions for automating your checks.

For more info, check out https://keybase.io/docs/command_line/code_signing