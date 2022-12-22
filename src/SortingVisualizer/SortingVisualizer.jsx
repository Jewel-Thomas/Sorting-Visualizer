import React from "react";
import {getMergeSortAnimations} from '../SortingAlgorithms/SortingAlgorithms.js'
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#90EE90';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component{
    constructor(props)
    {
        super(props);
        this.state = {  
            array:[],
        };
    }

    componentDidMount()
    {
        this.ResetArray();
    }

    ResetArray()
    {
        const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    this.setState({array});
    }

    MergeSort()
    {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
    }

    QuickSort()
    {

    }

    HeapSort()
    {

    }

    BubbleSort()
    {

    }

    TestSortingAlgorithms()
    {
        for (let i = 0; i < 100; i++) {
            const array = [];
            const length = randomIntFromInterval(1, 1000);
            for (let i = 0; i < length; i++) {
              array.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
            const mergeSortedArray = getMergeSortAnimations(array.slice());
            console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
          }
    }

    render()
    {
        const {array} = this.state;
        return(
           <div className="array-container"> 
            {array.map((value,idx) => (
                <div 
                    className="array-bar" 
                    key={idx}
                    style={{height: `${value}px`}}></div>    
            ))} 
            <button onClick={()=>this.ResetArray()}>Generate new Array</button>
            <button onClick={()=>this.MergeSort()}>Merge Sort</button>
            {/* <button onClick={()=>this.QuickSort()}>Quick Sort</button>
            <button onClick={()=>this.HeapSort()}>Heap Sort</button>
            <button onClick={()=>this.BubbleSort()}>Bubble Sort</button> */}
            {/* <button onClick={()=>this.TestSortingAlgorithms()}>Test Sorting Algorithms</button> */}
            </div>
           
        );
    }

}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random() * (max-min+1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo)
{
    if(arrayOne.length !== arrayTwo.length) return false;
    for(let i=0;i<arrayOne.length;i++)
    {
        if(arrayOne[i] !== arrayTwo[i])
        {
            return false;
        }
    }
    return true;
}