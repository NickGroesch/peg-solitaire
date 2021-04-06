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
console.log(triangles)


function Pegboard() {
    return (
        <svg viewBox="0 0 1000 1000">
            <polygon points="500,0 0,866 1000,866" fill="lightgreen" />
            <polygon points="100,692.8 0,866 200,866" fill="lightgreen" stroke="red" />
            {triangles.map(tri => (
                <polygon
                    key={tri.map(point => point.join(",")).join(" ")}
                    points={tri.map(point => point.join(",")).join(" ")}
                    fill="pink"
                    stroke="magenta"
                />))}
            {holes.map(center => (
                <circle cx={center[0]} cy={center[1]} r={20} fill="goldenrod" />
            ))}
            <polygon points="0,866 1000,866 1000,906 0,906" fill="lightblue" />


        </svg>
    );
}

export default Pegboard;