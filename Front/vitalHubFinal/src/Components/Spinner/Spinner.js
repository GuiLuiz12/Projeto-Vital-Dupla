import React from 'react';
import './Style.js';
import { Image } from 'react-native';

function Spinner({ alt = ''}) {
    return (
        <Image 
            source={require('../../Assets/Images/spinner-loading.svg')} 
            alt={alt}
        />
    );
}

export default Spinner;