import React from 'react';

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


function Pegboard() {
    return (
        <svg viewBox="0 0 1000 1000">
            <polygon points="500,0 0,866 1000,866" fill="lightgreen" />
            <polygon points="100,692.8 0,866 200,866" fill="lightgreen" stroke="red" />
            {triangles.map((tri, index) => (
                <polygon
                    key={index} //this list is: static, items lack id's, will never be reordered //https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318
                    points={tri.map(point => point.join(",")).join(" ")}
                    fill="pink"
                    stroke="magenta"
                />))}
            {holes.map((center, index) => (
                <circle key={index} cx={center[0]} cy={center[1]} r={20} fill="goldenrod" />
            ))}
            <polygon points="0,866 1000,866 1000,906 0,906" fill="lightblue" />


        </svg>
    );
}

export default Pegboard;