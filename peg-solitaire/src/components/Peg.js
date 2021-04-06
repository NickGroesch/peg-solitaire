import React from 'react';

function Peg({ cy, cx, peg, index, handleDown, handleMove, handleUp }) {
    const mouseDown = (e) => {
        handleDown(e, index)
    }
    const mouseMove = (e) => {
        handleMove(e)
    }
    return (
        <>
            <polygon
                key={`${peg}rec`}
                points={
                    `${cx - 20},${cy} ${cx + 20},${cy} ${cx + 20},${cy - 40} ${cx - 20},${cy - 40}`
                }
                fill="brown"
                onMouseDown={mouseDown}
            />
            <circle
                key={peg}
                cx={cx}
                cy={cy}
                r={20} fill="brown"
                onMouseDown={mouseDown}
            />
            <circle
                key={`${peg}top`}
                cx={cx}
                cy={cy - 40}
                r={20}
                fill="brown"
                onMouseDown={mouseDown}
            />
        </>
    );
}

export default Peg;