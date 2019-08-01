import React, { Component } from 'react';

import Story from '../../components/story';

import './homepage.styles.css';

const data = [
    {
        by : "ska80",
        descendants : 13,
        id : 20505378,
        kids : [ 20505993, 20506049, 20505611, 20505570, 20505448 ],
        score : 131,
        time : 1563872512,
        title : "“Programming Algorithms” Book",
        type : "story",
        url : "https://lisp-univ-etc.blogspot.com/2019/07/programming-algorithms-book.html"
      },
      {
        by : "ska80",
        descendants : 2,
        id : 20505807,
        kids : [ 20506348, 20506216 ],
        score : 30,
        time : 1563879988,
        title : "Common Lisp Style Guide",
        type : "story",
        url : "https://lisp-lang.org/style-guide/"
      },
      {
        by : "LluisGerard",
        descendants : 26,
        id : 20505638,
        kids : [ 20505853, 20505781, 20505857, 20505841, 20506283, 20505985, 20505913, 20505796 ],
        score : 60,
        time : 1563877284,
        title : "Retro 5″ Black and White TV as a computer monitor – A tale of pointlessness",
        type : "story",
        url : "https://blog.uchujin.co.uk/2019/07/retro-5-black-and-white-tv-as-a-computer-monitor-a-tale-of-pointlessness/"
      },
      {
        by : "bookofjoe",
        descendants : 193,
        id : 20503194,
        kids : [ 20503637, 20503729, 20503717, 20503501, 20503989, 20503627, 20503703, 20505749, 20503865, 20503838, 20505800, 20503664, 20505238, 20503347, 20503793, 20503575, 20505879, 20505298, 20504708, 20503967, 20503541, 20505854, 20504121, 20503578, 20503420, 20504718, 20504130, 20503765, 20503691, 20504883, 20503808, 20504448, 20503761, 20504618 ],
        score : 774,
        time : 1563837691,
        title : "How to assess the quality of garments (2014)",
        type : "story",
        url : "https://anuschkarees.com/blog/2014/05/01/how-to-assess-the-quality-of-garments-a-beginners-guide-part-i/"
      }      
];

class HomePage extends Component {
    state = {
        stories: data
    }

    render() {
        return (
            <div className="homepage">
                {
                    this.state.stories.map((({id, ...otherProps}, idx) => (
                        <Story key={id} rank={idx + 1} {...otherProps}/>
                    )))
                }
            </div>
        );
    }
}

export default HomePage;
