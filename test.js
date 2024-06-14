const fs = require('fs');
const xlsx = require('xlsx');

// The provided data
const resources = [
    {
      "ref": {
        "@ref": {
          "id": "398619972330324036",
          "collection": {
            "@ref": {
              "id": "pbluewhale01",
              "collection": {
                "@ref": {
                  "id": "collections"
                }
              }
            }
          }
        }
      },
      "ts": 1716420869620000,
      "data": {
        "siteInfo": {
          "url": "https://milestones-topics-overview.netlify.app/#",
          "accessStartTime": "Wed May 22 2024 14:14:56 GMT-0700 (Pacific Daylight Saving Time)",
          "siteName": "Milestones Topics Overview",
          "timeActive": 1,
          "isExactBookmark": false,
          "like": false,
          "dislike": false,
          "qtags": "no-qtag-yet",
          "totalTime": 0,
          "categoryName": "uncategorized",
          "qtag": [
            "no-qtags-yet"
          ]
        }
      }
    },
    {
      "ref": {
        "@ref": {
          "id": "398619972472930372",
          "collection": {
            "@ref": {
              "id": "pbluewhale01",
              "collection": {
                "@ref": {
                  "id": "collections"
                }
              }
            }
          }
        }
      },
      "ts": 1716420866790000,
      "data": {
        "siteInfo": {
          "url": "https://www.google.com/search?client=firefox-b-d&q=animal+noises",
          "accessStartTime": "Wed May 22 2024 14:14:46 GMT-0700 (Pacific Daylight Saving Time)",
          "siteName": "google.com/search?client=firefox-b-d&q=animal+noises",
          "timeActive": 7,
          "isExactBookmark": false,
          "like": false,
          "dislike": true,
          "qtags": "no-qtag-yet",
          "totalTime": 0,
          "categoryName": "uncategorized",
          "qtag": [
            "no-qtags-yet"
          ]
        }
      }
    },
    {
      "ref": {
        "@ref": {
          "id": "398619972596662337",
          "collection": {
            "@ref": {
              "id": "pbluewhale01",
              "collection": {
                "@ref": {
                  "id": "collections"
                }
              }
            }
          }
        }
      },
      "ts": 1716420857230000,
      "data": {
        "siteInfo": {
          "url": "https://en.wikipedia.org/wiki/List_of_animal_sounds",
          "accessStartTime": "Wed May 22 2024 14:14:15 GMT-0700 (Pacific Daylight Saving Time)",
          "siteName": "en.wikipedia.org/wiki/List_of_animal_sounds",
          "timeActive": 33,
          "isExactBookmark": false,
          "like": true,
          "dislike": false,
          "qtags": "animal-noises",
          "totalTime": 0,
          "categoryName": "uncategorized",
          "qtag": "animal-noises"
        }
      }
    },
    {
      "ref": {
        "@ref": {
          "id": "398619995211300932",
          "collection": {
            "@ref": {
              "id": "pbluewhale01",
              "collection": {
                "@ref": {
                  "id": "collections"
                }
              }
            }
          }
        }
      },
      "ts": 1716412501740000,
      "data": {
        "siteInfo": {
          "url": "https://seaworld.org/animals/sounds/",
          "accessStartTime": "Wed May 22 2024 14:14:58 GMT-0700 (Pacific Daylight Saving Time)",
          "siteName": "seaworld.org/animals/sounds/",
          "timeActive": 3,
          "isExactBookmark": false,
          "like": false,
          "dislike": false,
          "qtags": "no-qtag-yet",
          "totalTime": 10,
          "categoryName": "uncategorized"
        }
      }
    },
    {
      "ref": {
        "@ref": {
          "id": "399150925928726596",
          "collection": {
            "@ref": {
              "id": "pbluewhale01",
              "collection": {
                "@ref": {
                  "id": "collections"
                }
              }
            }
          }
        }
      },
      "ts": 1716918994136000,
      "data": {
        "siteInfo": {
          "url": "https://www.google.com/search?client=firefox-b-d&q=heuristic+evalutions",
          "accessStartTime": "Tue May 28 2024 10:55:23 GMT-0700 (Pacific Daylight Saving Time)",
          "siteName": "google.com/search?client=firefox-b-d&q=heuristic+evalutions",
          "timeActive": 3,
          "isExactBookmark": false,
          "like": false,
          "dislike": false,
          "qtags": "no-qtag-yet",
          "totalTime": 0,
          "categoryName": "uncategorized"
        }
      }
    },
    {
      "ref": {
        "@ref": {
          "id": "399150926059798593",
          "collection": {
            "@ref": {
              "id": "pbluewhale01",
              "collection": {
                "@ref": {
                  "id": "collections"
                }
              }
            }
          }
        }
      },
      "ts": 1716919474383000,
      "data": {
        "siteInfo": {
          "url": "https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/",
          "accessStartTime": "Tue May 28 2024 10:53:19 GMT-0700 (Pacific Daylight Saving Time)",
          "siteName": "Heuristic Evaluations: How to Conduct",
          "timeActive": 43,
          "isExactBookmark": false,
          "like": false,
          "dislike": false,
          "qtags": "worksheet",
          "totalTime": 0,
          "categoryName": "lectures_and_demos",
          "qtag": "worksheet"
        }
      }
    },
    {
      "ref": {
        "@ref": {
          "id": "399150979775201348",
          "collection": {
            "@ref": {
              "id": "pbluewhale01",
              "collection": {
                "@ref": {
                  "id": "collections"
                }
              }
            }
          }
        }
      },
      "ts": 1716918994500000,
      "data": {
        "siteInfo": {
          "url": "https://www.interaction-design.org/literature/topics/heuristic-evaluation",
          "accessStartTime": "Tue May 28 2024 10:55:34 GMT-0700 (Pacific Daylight Saving Time)",
          "siteName": "What is Heuristic Evaluation? — updated 2024 | IxDF",
          "timeActive": 4,
          "isExactBookmark": false,
          "like": false,
          "dislike": false,
          "qtags": "heuristic-evaluation",
          "totalTime": 2,
          "categoryName": "uncategorized",
          "qtag": "heuristic-evaluation"
        }
      }
    },
    {
      "ref": {
        "@ref": {
          "id": "399151091123486788",
          "collection": {
            "@ref": {
              "id": "pbluewhale01",
              "collection": {
                "@ref": {
                  "id": "collections"
                }
              }
            }
          }
        }
      },
      "ts": 1716919792850000,
      "data": {
        "siteInfo": {
          "url": "https://www.nngroup.com/articles/ten-usability-heuristics/",
          "accessStartTime": "Tue May 28 2024 11:04:57 GMT-0700 (Pacific Daylight Saving Time)",
          "siteName": "10 Usability Heuristics for User Interface Design",
          "timeActive": 14,
          "isExactBookmark": true,
          "like": false,
          "dislike": false,
          "qtags": [
            "no-qtags-yet"
          ],
          "totalTime": 0,
          "categoryName": "articles",
          "qtag": [
            "no-qtags-yet"
          ]
        }
      }
    },
    {
      "ref": {
        "@ref": {
          "id": "399151091391922241",
          "collection": {
            "@ref": {
              "id": "pbluewhale01",
              "collection": {
                "@ref": {
                  "id": "collections"
                }
              }
            }
          }
        }
      },
      "ts": 1716918994260000,
      "data": {
        "siteInfo": {
          "url": "https://www.google.com/search?client=firefox-b-d&sca_esv=6dc0ae32fc817d32&sca_upv=1&q=heuristic+evaluations&tbm=isch&source=lnms&prmd=ivsnbmtz&sa=X&ved=2ahUKEwji7Zv29LCGAxVMATQIHZnmAXAQ0pQJegQIDxAB&biw=1368&bih=649&dpr=1#imgrc=o2eDPMMgJ__FhM",
          "accessStartTime": "Tue May 28 2024 10:55:29 GMT-0700 (Pacific Daylight Saving Time)",
          "siteName": "heuristic evaluations - Google Search",
          "timeActive": 3,
          "isExactBookmark": false,
          "like": false,
          "dislike": false,
          "qtags": "no-qtag-yet",
          "totalTime": 0,
          "categoryName": "uncategorized"
        }
      }
    },
    {
      "ref": {
        "@ref": {
          "id": "399151091769409604",
          "collection": {
            "@ref": {
              "id": "pbluewhale01",
              "collection": {
                "@ref": {
                  "id": "collections"
                }
              }
            }
          }
        }
      },
      "ts": 1716918994610000,
      "data": {
        "siteInfo": {
          "url": "https://www.google.com/search?client=firefox-b-d&sca_esv=6dc0ae32fc817d32&sca_upv=1&q=heuristic+evaluations&tbm=isch&source=lnms&prmd=ivsnbmtz&sa=X&ved=2ahUKEwji7Zv29LCGAxVMATQIHZnmAXAQ0pQJegQIDxAB&biw=1368&bih=649&dpr=1#imgrc=fcY_VPc59l5C9M",
          "accessStartTime": "Tue May 28 2024 10:55:36 GMT-0700 (Pacific Daylight Saving Time)",
          "siteName": "heuristic evaluations - Google Search",
          "timeActive": 2,
          "isExactBookmark": false,
          "like": false,
          "dislike": false,
          "qtags": "no-qtag-yet",
          "totalTime": 0,
          "categoryName": "uncategorized"
        }
      }
    },
    {
        "ref": {
          "@ref": {
            "id": "399151091391922241",
            "collection": {
              "@ref": {
                "id": "pbluewhale01",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1716918994260000,
        "data": {
          "siteInfo": {
            "url": "https://www.google.com/search?client=firefox-b-d&sca_esv=6dc0ae32fc817d32&sca_upv=1&q=heuristic+evaluations&tbm=isch&source=lnms&prmd=ivsnbmtz&sa=X&ved=2ahUKEwji7Zv29LCGAxVMATQIHZnmAXAQ0pQJegQIDxAB&biw=1368&bih=649&dpr=1#imgrc=o2eDPMMgJ__FhM",
            "accessStartTime": "Tue May 28 2024 10:55:29 GMT-0700 (Pacific Daylight Saving Time)",
            "siteName": "heuristic evaluations - Google Search",
            "timeActive": 3,
            "isExactBookmark": false,
            "like": false,
            "dislike": false,
            "qtags": "no-qtag-yet",
            "totalTime": 0,
            "categoryName": "uncategorized"
          }
        }
      },
      {
        "ref": {
          "@ref": {
            "id": "399151091769409604",
            "collection": {
              "@ref": {
                "id": "pbluewhale01",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1716918994610000,
        "data": {
          "siteInfo": {
            "url": "https://www.google.com/search?client=firefox-b-d&sca_esv=6dc0ae32fc817d32&sca_upv=1&q=heuristic+evaluations&tbm=isch&source=lnms&prmd=ivsnbmtz&sa=X&ved=2ahUKEwji7Zv29LCGAxVMATQIHZnmAXAQ0pQJegQIDxAB&biw=1368&bih=649&dpr=1#imgrc=fcY_VPc59l5C9M",
            "accessStartTime": "Tue May 28 2024 10:55:36 GMT-0700 (Pacific Daylight Saving Time)",
            "siteName": "heuristic evaluations - Google Search",
            "timeActive": 2,
            "isExactBookmark": false,
            "like": false,
            "dislike": false,
            "qtags": "no-qtag-yet",
            "totalTime": 0,
            "categoryName": "uncategorized"
          }
        }
      },
      {
        "ref": {
          "@ref": {
            "id": "399151091888947268",
            "collection": {
              "@ref": {
                "id": "pbluewhale01",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1716918994720000,
        "data": {
          "siteInfo": {
            "url": "https://www.google.com/search?client=firefox-b-d&sca_esv=6dc0ae32fc817d32&sca_upv=1&q=heuristic+evaluations&tbm=isch&source=lnms&prmd=ivsnbmtz&sa=X&ved=2ahUKEwji7Zv29LCGAxVMATQIHZnmAXAQ0pQJegQIDxAB&biw=1368&bih=649&dpr=1#imgrc=yVRY4keyzbMatM",
            "accessStartTime": "Tue May 28 2024 10:55:39 GMT-0700 (Pacific Daylight Saving Time)",
            "siteName": "heuristic evaluations - Google Search",
            "timeActive": 8,
            "isExactBookmark": false,
            "like": false,
            "dislike": false,
            "qtags": "no-qtag-yet",
            "totalTime": 0,
            "categoryName": "uncategorized"
          }
        }
      },
      {
        "ref": {
          "@ref": {
            "id": "399151092004290625",
            "collection": {
              "@ref": {
                "id": "pbluewhale01",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1716918994840000,
        "data": {
          "siteInfo": {
            "url": "https://www.google.com/search?client=firefox-b-d&sca_esv=6dc0ae32fc817d32&sca_upv=1&q=heuristic+evaluations&tbm=isch&source=lnms&prmd=ivsnbmtz&sa=X&ved=2ahUKEwji7Zv29LCGAxVMATQIHZnmAXAQ0pQJegQIDxAB&biw=1368&bih=649&dpr=1#imgrc=LoJgz1TtQKhbCM",
            "accessStartTime": "Tue May 28 2024 10:55:47 GMT-0700 (Pacific Daylight Saving Time)",
            "siteName": "heuristic evaluations - Google Search",
            "timeActive": 8,
            "isExactBookmark": false,
            "like": false,
            "dislike": false,
            "qtags": "no-qtag-yet",
            "totalTime": 0,
            "categoryName": "uncategorized"
          }
        }
      },
      {
        "ref": {
          "@ref": {
            "id": "399151092132216897",
            "collection": {
              "@ref": {
                "id": "pbluewhale01",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1716918994960000,
        "data": {
          "siteInfo": {
            "url": "https://www.google.com/search?client=firefox-b-d&sca_esv=6dc0ae32fc817d32&sca_upv=1&q=heuristic+evaluations&tbm=isch&source=lnms&prmd=ivsnbmtz&sa=X&ved=2ahUKEwji7Zv29LCGAxVMATQIHZnmAXAQ0pQJegQIDxAB&biw=1368&bih=649&dpr=1#imgrc=49JMyqkVGiEdLM",
            "accessStartTime": "Tue May 28 2024 10:55:55 GMT-0700 (Pacific Daylight Saving Time)",
            "siteName": "heuristic evaluations - Google Search",
            "timeActive": 0,
            "isExactBookmark": false,
            "like": false,
            "dislike": false,
            "qtags": "no-qtag-yet",
            "totalTime": 0,
            "categoryName": "uncategorized"
          }
        }
      },
      {
        "ref": {
          "@ref": {
            "id": "399151092255948868",
            "collection": {
              "@ref": {
                "id": "pbluewhale01",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1716918995070000,
        "data": {
          "siteInfo": {
            "url": "https://www.google.com/search?client=firefox-b-d&sca_esv=6dc0ae32fc817d32&sca_upv=1&q=heuristic+evaluations&tbm=isch&source=lnms&prmd=ivsnbmtz&sa=X&ved=2ahUKEwji7Zv29LCGAxVMATQIHZnmAXAQ0pQJegQIDxAB&biw=1368&bih=649&dpr=1",
            "accessStartTime": "Tue May 28 2024 10:55:55 GMT-0700 (Pacific Daylight Saving Time)",
            "siteName": "heuristic evaluations - Google Search",
            "timeActive": 9,
            "isExactBookmark": false,
            "like": false,
            "dislike": false,
            "qtags": "no-qtag-yet",
            "totalTime": 0,
            "categoryName": "uncategorized"
          }
        }
      },
      {
        "ref": {
          "@ref": {
            "id": "399151092373389380",
            "collection": {
              "@ref": {
                "id": "pbluewhale01",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1716918995180000,
        "data": {
          "siteInfo": {
            "url": "https://www.google.com/search?q=heuristic+evaluation+pros+and+cons&tbm=isch&ved=2ahUKEwjQ1eu09bCGAxVGLzQIHYGsDdEQ2-cCegQIABAA&oq=heuristic+evaluation+pros+and+cons&gs_lp=EgNpbWciImhldXJpc3RpYyBldmFsdWF0aW9uIHByb3MgYW5kIGNvbnNIAFAAWABwAHgAkAEAmAEAoAEAqgEAuAEDyAEAigILZ3dzLXdpei1pbWc&sclient=img&ei=jBpWZtDfIMbe0PEPgdm2iA0&bih=649&biw=1368&client=firefox-b-d&prmd=ivsnbmtz",
            "accessStartTime": "Tue May 28 2024 10:56:04 GMT-0700 (Pacific Daylight Saving Time)",
            "siteName": "google.com/search?q=heuristic+evaluation+pros+and+cons&tbm=isch&ved=2ahUKEwjQ1eu09bCGAxVGLzQIHYGsDdE",
            "timeActive": 3,
            "isExactBookmark": false,
            "like": false,
            "dislike": false,
            "qtags": "no-qtag-yet",
            "totalTime": 0,
            "categoryName": "uncategorized"
          }
        }
      },
      {
        "ref": {
          "@ref": {
            "id": "399151092495024196",
            "collection": {
              "@ref": {
                "id": "pbluewhale01",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1716918995305000,
        "data": {
          "siteInfo": {
            "url": "https://www.google.com/search?q=heuristic+evaluation+pros+and+cons&source=lmns&bih=649&biw=1368&client=firefox-b-d&prmd=ivsnbmtz&hl=en-US&sa=X&ved=2ahUKEwi4oNPG9bCGAxVFJTQIHaeCAYAQ0pQJKAB6BAgBEAI",
            "accessStartTime": "Tue May 28 2024 10:56:07 GMT-0700 (Pacific Daylight Saving Time)",
            "siteName": "heuristic evaluation pros and cons - Google Search",
            "timeActive": 7,
            "isExactBookmark": false,
            "like": false,
            "dislike": false,
            "qtags": "no-qtag-yet",
            "totalTime": 0,
            "categoryName": "uncategorized"
          }
        }
      },
      {
        "ref": {
          "@ref": {
            "id": "399151092618756164",
            "collection": {
              "@ref": {
                "id": "pbluewhale01",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1716919390950000,
        "data": {
          "siteInfo": {
            "url": "https://ux247.com/the-pros-and-cons-of-heuristic-evaluation/",
            "accessStartTime": "Tue May 28 2024 10:56:14 GMT-0700 (Pacific Daylight Saving Time)",
            "siteName": "ux247.com/the-pros-and-cons-of-heuristic-evaluation/",
            "timeActive": 32,
            "isExactBookmark": false,
            "like": false,
            "dislike": false,
            "qtags": "pro-con",
            "totalTime": 0,
            "categoryName": "articles",
            "qtag": "pro-con"
          }
        }
      },
      {
        "ref": {
          "@ref": {
            "id": "399151172235034689",
            "collection": {
              "@ref": {
                "id": "pbluewhale01",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1716919071356000,
        "data": {
          "siteInfo": {
            "url": "https://www.google.com/search?client=firefox-b-d&q=website",
            "accessStartTime": "Tue May 28 2024 10:57:46 GMT-0700 (Pacific Daylight Saving Time)",
            "siteName": "website - Google Search",
            "timeActive": 2,
            "isExactBookmark": false,
            "like": false,
            "dislike": false,
            "qtags": "no-qtag-yet",
            "totalTime": 0,
            "categoryName": "uncategorized"
          }
        }
      },
      {
        "ref": {
          "@ref": {
            "id": "399151172455235652",
            "collection": {
              "@ref": {
                "id": "pbluewhale01",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1716919396823000,
        "data": {
          "siteInfo": {
            "url": "https://www.website.com/ca/",
            "accessStartTime": "Tue May 28 2024 10:57:48 GMT-0700 (Pacific Daylight Saving Time)",
            "siteName": "website.com/ca/",
            "timeActive": 13,
            "isExactBookmark": false,
            "like": false,
            "dislike": false,
            "qtags": "web2",
            "totalTime": 0,
            "categoryName": "articles",
            "qtag": "web2"
          }
        }
      },
      {
        "ref": {
          "@ref": {
            "id": "399151928918933572",
            "collection": {
              "@ref": {
                "id": "pbluewhale01",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1716919792970000,
        "data": {
          "siteInfo": {
            "url": "https://www.google.com/search?client=firefox-b-d&q=netflix",
            "accessStartTime": "Tue May 28 2024 11:09:45 GMT-0700 (Pacific Daylight Saving Time)",
            "siteName": "google.com/search?client=firefox-b-d&q=netflix",
            "timeActive": 3,
            "isExactBookmark": false,
            "like": false,
            "dislike": false,
            "qtags": "no-qtag-yet",
            "totalTime": 4,
            "categoryName": "uncategorized"
          }
        }
      },
      {
        "ref": {
          "@ref": {
            "id": "399151929051054148",
            "collection": {
              "@ref": {
                "id": "pbluewhale01",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1716919873475000,
        "data": {
          "siteInfo": {
            "url": "https://www.netflix.com/ca/",
            "accessStartTime": "Tue May 28 2024 11:09:47 GMT-0700 (Pacific Daylight Saving Time)",
            "siteName": "Netflix Canada - Watch TV Shows Online, Watch Movies Online",
            "timeActive": 20,
            "isExactBookmark": false,
            "like": false,
            "dislike": false,
            "qtags": "bookmarked",
            "totalTime": 7,
            "categoryName": "uncategorized",
            "qtag": "bookmarked"
          }
        }
      },
      {
        "ref": {
          "@ref": {
            "id": "399797411602497602",
            "collection": {
              "@ref": {
                "id": "pbluewhale01",
                "collection": {
                  "@ref": {
                    "id": "collections"
                  }
                }
              }
            }
          }
        },
        "ts": 1717701627910000,
        "data": {
          "siteInfo": {
            "url": "about:debugging#/runtime/this-firefox",
            "accessStartTime": "Thu Jun 06 2024 12:15:29 GMT-0700 (Pacific Daylight Saving Time)",
            "siteName": "Debugging - Runtime / this-firefox",
            "timeActive": 3,
            "isExactBookmark": false,
            "like": false,
            "dislike": false,
            "qtags": "no-qtag-yet",
            "totalTime": 0,
            "categoryName": "uncategorized"
          }
        }
      }
];

// Extract the relevant data into a flat array of objects
const resourceData = resources.map((resource) => {
    const { url, accessStartTime, siteName, timeActive, isExactBookmark, like, dislike, qtags, totalTime, categoryName, qtag } = resource.data.siteInfo;
    return {
        url,
        accessStartTime,
        siteName,
        timeActive,
        isExactBookmark,
        like,
        dislike,
        qtags,
        totalTime,
        categoryName,
        qtag
    };
});

// Define the headers
const headers = [
    'url',
    'accessStartTime',
    'siteName',
    'timeActive',
    'isExactBookmark',
    'like',
    'dislike',
    'qtags',
    'totalTime',
    'categoryName',
    'qtag'
];

// Create a new workbook and add the data
const workbook = xlsx.utils.book_new();
const worksheet = xlsx.utils.json_to_sheet(resourceData, { header: headers });

// Add the worksheet to the workbook
xlsx.utils.book_append_sheet(workbook, worksheet, 'ResourceData');

// Save the workbook to a file
const filePath = '/mnt/data/resource_data.xlsx';
xlsx.writeFile(workbook, filePath);

console.log(`Excel file created at ${filePath}`);
