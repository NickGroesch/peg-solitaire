import React from 'react';

function Peg({ cy, cx, peg, index, handleDown, handleMove, handleUp }) {
    const mouseDown = (e) => {
        handleDown(e, index)
    }
    const mouseMove = (e) => {
        handleMove(e)
    }
    const mouseUp = (e) => {
        handleUp(e)
    }
    return (
        <g
            onMouseDown={mouseDown}
            onMouseMove={mouseMove}
            onMouseUp={mouseUp}
            fill="brown"
        >
            <polygon
                key={`${peg}rec`}
                points={
                    `${cx - 20},${cy} ${cx + 20},${cy} ${cx + 20},${cy - 40} ${cx - 20},${cy - 40}`
                }
            />
            <circle
                key={peg}
                cx={cx}
                cy={cy}
                r={20}

            />
            <circle
                key={`${peg}top`}
                cx={cx}
                cy={cy - 40}
                r={20}
            />
        </g>
    );
}

export default Peg;