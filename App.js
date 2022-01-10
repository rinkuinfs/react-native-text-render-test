/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { fragmentToJSON, defaultSchema as schema } from "@atlaskit/adf-schema";
import { DOMSerializer } from "prosemirror-model";
import { env } from 'jsdom-jscore-rn';

import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import CounterStyle from '@jsamr/counter-style';



const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [str, setStr] = useState("");
  const [source, setSource] = useState("");

  // default schema from Atlassian adf-schema is same as prosemirror-model schema
  //create an DOM serializer from adf-schema
  const mainSerializer = DOMSerializer.fromSchema(schema);

  const getDOMDocument = (nodeObject) => {

    env('<!DOCTYPE html><div id="content"></div>', "1", function(errors, window) {
      const document = window.document;
      const renderer = document.querySelector('div');
      const node = schema.nodeFromJSON(nodeObject);
      mainSerializer.serializeFragment(node, { document }, renderer);
      setStr(document.getElementById("content").innerHTML);
    })

    

    // return { document, renderer };
  };

  const adfToHTML = (nodeObject) => {
    // create a dom object for conversion of schema to html
    getDOMDocument(nodeObject);
  };

  useEffect(() => {
    adfToHTML(initialDocument);
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    setSource({
      html: `
            ${str}
            `
    })
  }, [str]);

  const { width } = useWindowDimensions();


  const tagsStyles = {
    body: {
      padding: 15
    },
  };


  const onElement = (el) => {
    const { children, name } = el;
    if (name === 'ul' && children && children.length) {
        el.attribs["style"] = "list-style-type: green-tick;";
    }
  }

  const customListStyleSpecs = {
    'green-tick': {
      type: 'textual',
      counterStyleRenderer: CounterStyle.cyclic('✓').withSuffix(" ")
    }
  };
  
  const renderersProps = {
    ul: {
      markerBoxStyle: {
        marginTop: 15
      },
      markerTextStyle: {
        color: 'green',
      },
    },
  };



  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ flex: 1 }}>
          <RenderHtml
            contentWidth={width}
            source={source}
            tagsStyles={tagsStyles}
            domVisitors={{onElement}} // first alter your html
            customListStyleSpecs={customListStyleSpecs}
            renderersProps={renderersProps}

          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const initialDocument = {
  "version": 1,
  "type": "doc",
  "content": [
    {
      "type": "heading",
      "attrs": {
        "level": 2
      },
      "content": [
        {
          "type": "text",
          "text": "Lifestyle disorder related to obesity"
        }
      ]
    },
    {
      "type": "heading",
      "attrs": {
        "level": 3
      },
      "content": [
        {
          "type": "text",
          "text": "Polycystic Ovary Syndrome",
          "marks": [
            {
              "type": "strong"
            }
          ]
        },
        {
          "type": "text",
          "text": " "
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Polycystic Ovary Syndrome, a lifestyle disorder in women, is found to be primarily associated with obesity (Barber et al, 2019). The underlying causes of PCOS are not well understood, and there are several factors believed to be related to the pathogenesis of PCOS. Genetics and family history are thought to be associated and other factors that can lead to insulin resistance, obesity from puberty."
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": " "
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "On the other hand, PCOD is a condition developed by hormonal imbalance, and most of the time, nutritional and exercise interventions can help to reverse the ill effects of pcod."
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": " "
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "The main organs affected by PCOS are the ovaries. Ovaries are the primary female reproductive organs and these may develop numerous small collections of fluid called follicles. But, due to hormonal disorder, these could turn into small cysts on the outer edges. In PCOS, the ovaries maybe 1.5 to 3 times larger than normal, and characteristically, have 12 or more follicles per ovary, measuring 2 to 9 mm in diameter."
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": " "
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "The symptoms of PCOS include excess hair growth, acne, and obesity. This can also lead to missed or irregular menstrual periods and make it harder for women to conceive. Losing weight can be extremely beneficial to reduce the severity of this condition (Barber et al, 2019)."
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": " ",
          "marks": [
            {
              "type": "em"
            }
          ]
        },
        {
          "type": "text",
          "text": "Hyperlipidemia",
          "marks": [
            {
              "type": "strong"
            }
          ]
        },
        {
          "type": "text",
          "text": " "
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "People who are overweight or obese are at a greater risk of developing hyperlipidemia (M Moyen, 2010). Hyperlipidemia is an umbrella term that refers to any of several acquired or genetic disorders that result in a high level of lipids (fats, cholesterol and triglycerides) circulating in the blood, and the reason for their abnormally raised levels is usually sighted to be a poor lifestyle and food choices apart from inheritance. "
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Type II Diabetes Mellitus",
          "marks": [
            {
              "type": "strong"
            }
          ]
        },
        {
          "type": "text",
          "text": " "
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "This is a chronic disorder characterized by raised levels of sugar in the blood. This disease affects the way a person’s body processes glucose or blood sugar. It is also known as adult-onset diabetes as it usually gets detected in middle and late adulthood. In the US, about 87% of adults with diabetes are overweight or obese. It is proposed that being overweight causes inflammation which makes the cells resistant to the hormone insulin, which further signals cells to take up glucose from the blood (NIH Health Information)."
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "A few symptoms of Type II Diabetes include excessive hunger, thirst, and urination, along with weight loss and increased susceptibility to fungal infection."
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": " "
        },
        {
          "type": "text",
          "text": "Metabolic Syndrome",
          "marks": [
            {
              "type": "strong"
            }
          ]
        },
        {
          "type": "text",
          "text": " "
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Metabolic Syndrome is a cluster or group of risk factors that increase the chances of developing diseases such as diabetes, stroke, and disorders related to the heart. A few of its characteristics are"
        }
      ]
    },
    {
      "type": "bulletList",
      "content": [
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "Excess body fat"
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "Insulin resistance & hyperinsulinemia"
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "High blood sugar"
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "Abnormal cholesterol"
                }
              ]
            }
          ]
        },
        {
          "type": "listItem",
          "content": [
            {
              "type": "paragraph",
              "content": [
                {
                  "type": "text",
                  "text": "High triglyceride levels"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": " "
        }
      ]
    },
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Obesity, therefore, is both a cause and a sign of Metabolic Syndrome (Kaur, 2014). Metabolic syndrome is not a disease in itself. Having just one of these conditions doesn't imply metabolic syndrome but it implies that if a person develops more of these conditions, he has a greater risk of developing some serious complications. Having understood all these lifestyle-related disorders, why not go ahead and see what all precautions should be taken to prevent them!"
        }
      ]
    }
  ]
};
export default App;