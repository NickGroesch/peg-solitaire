import React from 'react';

function Peg({ cy, cx, peg, index, handleDown }) {
    const mouseDown = (e) => {
        handleDown(e, index)
    }

    return (
        <g
            onMouseDown={mouseDown}
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