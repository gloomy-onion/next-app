import React from 'react';
import Image from 'next/image';
import styles from './Map.module.scss';

const MapImage = () => (
    <Image src="/map.jpg" className={styles.mapImg} alt="Map from Dora the explorer" fill />
);

export default MapImage;
