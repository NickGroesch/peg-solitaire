import React, { useEffect, useReducer, useState } from 'react';
import Peg from "./Peg"
const triangles = []
const holes = []
const height = 866
const fifthHigh = height / 5
for (let yDex = 0; yDex < 5; yDex++) {
    for (let xDex = 0; xDex < 5 - yDex; xDex++) {
        triangles.push([
            [(100 * yDex) + xDex * 200, height - (fifthHigh * yDex)],
            [(100 * yDex) + (xDex + 1) * 200, height - (fifthHigh * yDex)],
            [(100 * yDex) + xDex * 200 + 100, height - (fifthHigh * (yDex + 1))]
        ])
        holes.push([(100 * yDex) + xDex * 200 + 100, height - (fifthHigh * yDex) - 66.1])
    }
}
//we adopt index of trianglesArray for purposes of mapping legal moves
const legal = [ //index is STARTS, values are [JUMPS, LANDS]
    [[1, 2], [5, 9]],
    [[2, 3], [6, 10]],
    [[1, 0], [6, 9], [7, 11], [3, 4]],
    [[2, 1], [7, 10]],
    [[3, 2], [8, 11]],
    [[6, 7], [9, 12]],
    [[7, 8], [10, 13]],
    [[6, 5], [10, 12]],
    [[7, 6], [11, 13]],
    [[5, 0], [6, 2], [10, 11], [12, 14]],
    [[6, 1], [7, 3]],
    [[8, 4], [7, 2], [10, 9], [13, 14]],
    [[9, 5], [10, 7]],
    [[10, 6], [11, 8]],
    [[12, 9], [13, 11]]
]
function getKeyByValue(object, value) {//https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
    return Object.keys(object).find(key => object[key] === value);
}


function Pegboard() {
    const [history, setHistory] = useState([])
    const [pegs, dispatch] = useReducer(
        (state, [starts, lands]) => {

            const dontMessWithState = { ...state }
            const theMove = legal[starts].filter(move => move[1] == lands)[0]
            const jumps = theMove[0]
            console.log(starts, jumps, lands)
            //find the peg being jumped
            const beingJumped = getKeyByValue(dontMessWithState, jumps)
            //delete the peg being jumped
            delete dontMessWithState[beingJumped]
            //change the jumping pegs value
            const jumpingPeg = getKeyByValue(dontMessWithState, starts)
            dontMessWithState[jumpingPeg] = lands
            return dontMessWithState
        },
        { // Where the unique pegs are now
            peg0: 0,
            peg1: 1,
            peg2: 2,
            peg3: 3,
            // peg4: 4,
            // peg5: 5,
            peg6: 6,
            peg7: 7,
            // peg8: 8,
            peg9: 9,
            // peg10: 10,
            // peg11: 11,
            // peg12: 12,
            // peg13: 13,
            // peg14: 14
        })
    const [moves, setMoves] = useState([]) //available moves based on selected peg

    //dragging state
    const [dragging, setDragging] = useState(-1);
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [origin, setOrigin] = useState({ x: 0, y: 0 });

    // useEffect(() => {
    //     // const releasement = (e) => {
    //     //     console.log("I am released")
    //     //     setDragging(-1);
    //     //     setMoves([])
    //     //     setCoordinates({ x: 0, y: 0 })
    //     //     setOrigin({ x: 0, y: 0 })
    //     // }
    //     // document.addEventListener("mouseup", releasement)
    //     // return document.removeEventListener("mouseup", releasement)
    // }, [dragging])

    const handleDown = (e, index) => {
        console.log("HD", index)
        setOrigin({
            x: e.clientX,
            y: e.clientY
        });
        setDragging(index);
        const optionalMoves = legal[index]
        const legitMoves = optionalMoves.filter(move => {
            const jumps = move[0]
            const lands = move[1]
            if (Object.values(pegs).includes(jumps)) {
                if (!Object.values(pegs).includes(lands)) {
                    return true
                }
            }
            return false
        })
        setMoves(legitMoves.map(move => move[1]))
    }

    const handleMove = e => {
        if (dragging > -1) {
            setCoordinates({
                x: e.clientX - origin.x,
                y: e.clientY - origin.y,
            });
        }
    }

    const handleUp = (e) => {
        console.log("tickle bubble test")
        setDragging(-1);
        setMoves([])
        setCoordinates({ x: 0, y: 0 })
        setOrigin({ x: 0, y: 0 })
    }
    const dropHere = (index) => {
        console.log("kapow", dragging, index)
        dispatch([dragging, index])
    }

    return (
        <svg viewBox="0 0 1000 1000"
            onMouseUp={handleUp}
            onMouseMove={handleMove}
        >
            <polygon points="500,0 0,866 1000,866"
                fill="lightgreen"
            />
            <polygon points="0,866 1000,866 1000,906 0,906" fill="lightblue" />
            {triangles.map((tri, index) => {
                const isAMove = moves.includes(index)
                const center = holes[index]
                return (
                    <g
                        key={index}
                        //this list is: static, items lack id's, will never be reordered 
                        //https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318
                        onMouseUp={isAMove ? () => dropHere(index) : () => { }}
                    >
                        <polygon
                            points={tri.map(point => point.join(",")).join(" ")}
                            fill={isAMove ? "green" : "pink"}
                            stroke="magenta"
                        />
                        <circle
                            cx={center[0]}
                            cy={center[1]}
                            r={20}
                            fill="goldenrod"
                        />
                    </g>)
            })}

            {Object.keys(pegs).map(peg => {
                const index = pegs[peg]
                const center = holes[index]
                const isTheOne = dragging == index
                const cx = isTheOne ? center[0] + coordinates.x : center[0]
                const cy = isTheOne ? center[1] + coordinates.y : center[1]
                return (<Peg
                    cx={cx}
                    cy={cy}
                    key={peg}
                    peg={peg}
                    index={index}
                    handleDown={handleDown}
                    handleMove={handleMove}
                    handleUp={handleUp}
                />)
            })}

        </svg>
    );
}

export default Pegboard;