// questions.js
/*
{ 
    careerIndustry : {
                    skill : { 
                        question : "insert question"
                        answers : {
                            high : "high value answer"
                            medium : "medium value answer"
                            low : "low value answer"
                        }
                    }
                }   
}
*/
const careerQuestions = {
    "Finance Industry" : {
        "Frugality" : {
            question : "How would you feel if you are working on something and did not have enough resources? (Time, money, manpower, etc. )",
            answers : { 
                high : "Existence of constraints drives me to be innovative, efficient and successful.",
                medium : "Constraints on resources are not a huge problem for me. That being said, I also agree to the fact that the more resources, the better!",
                low : "I feel like my work and success would be hampered if sufficient resources are not available for use. I’d definitely choose to wait until I have all the necessary resources to be able to be innovative, efficient and successful."
            }
        },
        "Market and Trend Analysis" : {
            question : "How comfortable are you with working with data, charts and graphs? (Insert picture of chart or graph)",
            answers : { 
                high : "Whenever I see data (raw and/or summarized), the thought of exploring what the data means, visualizing trends and analysing them almost always crosses my mind. I like the feeling of being able to make meaningful conclusions after careful calculations and analysis.",
                medium : "Whenever I see data (raw and/or summarized), I tend to scratch the surface to see if I notice any trends. If I have to, I’m also comfortable looking at the data more closely to analyze it further.",
                low : "Whenever I see data (raw and/or summarized), the spreadsheets do not intrigue me. I feel just okay not diving any deeper to understand trends or changes."
            }
        },
        "Coordination and Team Management" : {
            question : "In a situation where a surprise party has to be planned for one of your best friends:",
            answers : { 
                high : "I like to be the person who actively takes initiative in coordinating everyone’s schedules, making venue/food arrangements and the guest list, and planning gifts for the occasion.",
                medium : "I like to be the person who is in-charge of smaller responsibilities, and can make sure that the task I undertake is successfully executed.",
                low : "I don’t really like planning and being in-charge of such social gatherings. However, I’ll be happy to attend the party and contribute my dues towards the gift."
            }
        },
        "Persuasion and Negotiation Skills" : {
            question : "You are splitting the cost with your partner to buy a gift to buy for your best friend. Your partner does not agree to the budget that you have set for this person's gift and refuses to budge. Choose one of the options that best describe your response:",
            answers : { 
                high : "I’ll explain to my partner how much this gift means and try to convince them to spend more anyway.",
                medium : "I’ll convince my partner, and meet in the middle by lowering my budget for the gift. ",
                low : "I’ll lower my price point since my partner won’t budge on my budget."
            }
        },
        "Public Speaking and Presentation" : {
            question : "You are in a room full of people, and you are welcome to talk about something you are most passionate about for 30-60 seconds. How confident would you feel doing this?",
            answers : { 
                high : "I’ll feel like myself, and I won’t shy away if I have to talk in a room full of people. I’ll go up there and speak my heart out -- no questions asked!",
                medium : "I’ll be nervous for sure, but I’ll be able to muster up the courage to present my speech in that room full of people.",
                low : "I’ll feel terrified at the thought of speaking in front of a room full of people. I’ll try going up there, but there is also a chance that I take a soft pass at that speech."
            }
        },
    }
}

module.exports = careerQuestions