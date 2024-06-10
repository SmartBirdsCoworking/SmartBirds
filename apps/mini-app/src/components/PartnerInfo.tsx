import React from 'react';
import { Blockquote  } from '@xelene/tgui';


export const NewPage = () => {
    return (
       <>
           <div style={{ display: 'flex', justifyContent: 'center' }}>
               <h1 >
                    Parner Name
               </h1>
           </div>
           <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                    src="https://static.tildacdn.one/tild6361-3139-4330-b064-393537376230/SB-Brandmark-Black_2.png"
                    alt="Logo"
                    style={{
                        width: '300px',
                        height: '300px',
                        alignSelf: 'center',
                    }}
                    />
           </div>
           <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Blockquote type="text">
                        There is grandeur in this view of life, with its several powers, having been originally breathed by the Creator into a few forms or into one; and that, whilst this planet has gone circling on according to the fixed law of gravity, from so simple a beginning endless forms most beautiful and most wonderful have been, and are being evolved.
                    </Blockquote>
           </div>
        </>
    );
};