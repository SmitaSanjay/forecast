import React from 'react'

export const Weather = React.memo((props) => {

    return (
        <>
            <div className={` ${props.isVisible ? 'col-9 ' : 'dispNone'}`}>
                <div className={` ${props.isVisible ? 'visible content' : 'hidden'}`}>
                    <button className='btn btn-sm btn-light closeBtn' onClick={props.closeWindow}>x</button>
                    <div className='weatherInfo h4'>
                        <div className='spacingbet'><strong>{props.country.name},</strong> {props.country.country}</div>
                        <div className='spacingbet'>{props.temp} &deg;C</div>
                        <div className='spacingbet'>{props.data.text}</div>
                        <img className='spacingbet' src={props.data.icon}></img>
                    </div>
                </div>
            </div>
        </>
    )
})
