import { NavItems } from '@/types';

export const navItems: NavItems = {
    Applications: [
        { title: 'Measurement Light Curtains', link: 'https://www.reersafety.com/us/en/products/measurement-sensors/item/66-micron-en' },
        { title: 'Collision Sensing Bumpers', link: 'https://www.tapeswitch.com/bumpers.html' },
        { title: 'Controflex Ribbon Switch', link: 'https://www.tapeswitch.com/ribbon-switches.html' },
        { title: 'Electric Safety Edge Guards', link: 'https://www.tapeswitch.com/sensing-edges.html' },
        {
            title: 'Electrical Mats',
            subitems: [
                { title: 'Tapeswitch', link: 'https://www.tapeswitch.com/safety-mats.html' },
                { title: 'LMI', link: 'http://www.londonmat.com/mats/zone.html' }
            ],
        },
    ],
    Manufacturers: [
        { title: 'Castell', link: 'http://www.castell.com/us/castell/products.php' },
    ],
};