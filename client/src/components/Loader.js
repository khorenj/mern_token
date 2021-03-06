import React, {useContext} from 'react';

export const Loader= () =>{

    return (
        <div style={{displa:'flex', justifyContent:'center',paddingTop:"2rem"}}>
            <div className="preloader-wrapper active" >
                <div className="spinner-layer spinner-red-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                        <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        </div>


    )
}