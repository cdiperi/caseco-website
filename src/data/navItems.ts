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
        { title: 'Measuring and Inspection Systems', link: 'https://www.micro-epsilon.com/measurement-systems/Kunststoff-Inspektion/' },
        {
            title: 'Light Curtains',
            subitems: [
                { title: 'EOS-4', link: 'https://www.reersafety.com/us/en/products/safety-light-curtains/item/48-eos4-en' },
                { title: 'Admiral', link: 'https://www.reersafety.com/us/en/products/safety-light-curtains/item/49-admiral-en' },
                { title: 'SafeGate', link: 'https://www.reersafety.com/us/en/products/safety-light-curtains/item/430-safegate-en' },
                { title: 'Light Curtain Accessories', link: 'https://www.reersafety.com/us/en/products/accessories' },
                { title: 'Discrete Safety Beams', link: 'https://www.reersafety.com/us/en/products/photocells' },
                { title: 'Light Curtain Water Tight Enclosures', link: 'https://www.reersafety.com/us/en/products/watertight-enclosures' },
                { title: 'ATEX – Explosion Environment Enclosures for Light Curtains', link: 'https://www.reersafety.com/us/en/products/atex-light-curtains' },
                { title: 'Type 2 Slim Light Curtain', link: 'https://www.reersafety.com/us/en/products/measurement-sensors/item/66-micron-en' },
                { title: 'Muting Photocells', link: 'https://www.reersafety.com/us/en/products/muting-photocell-en' },
                { title: 'SAFECODER – Safety Rated Encoder', link: 'https://www.reersafety.com/us/en/products/safety-encoders' }
            ],
        },
        { title: 'Safety Relays', link: 'https://www.tapeswitch.com/sim.html' },
        {
            title: 'Safety Interlock Switches',
            subitems: [
                { title: 'Mechanical Keyed Type', link: 'https://www.reersafety.com/us/en/products/safety-interlock/item/924-safelock-en' },
                { title: 'Electronic and Magnetic Type', link: 'https://www.mechancontrols.com/products/o-type/' },
                { title: 'TRAP-KEY Technology', link: 'http://www.castell.com/us/castell/products.php'}
            ],
        },
        { title: 'E-Stop Control Relays', link: 'https://www.reersafety.com/us/en/products/safety-interfaces' },
    ],
    Manufacturers: [
        { title: 'Castell', link: 'http://www.castell.com/us/castell/products.php' },
        { title: 'Reer Safety', link: 'https://www.reersafety.com/us/en/' },
        { title: 'Kontronik Power Systems', link: 'https://www.kontronik.com/en.html' },
        { title: 'Gordon Engineering', link: 'http://www.gordoneng.com/default.htm' },
        { title: 'London Mat', link: 'http://www.londonmat.com/' },
        { title: 'Mechan Controls', link: 'http://www.mechancontrols.co.uk/' },
        { title: 'Micro Epsilon', link: 'http://www.micro-epsilon.com/index.html' },
        {
            title: 'Tapeswitch',
            subitems: [
                { title: 'Tapeswitch Corporation', link: 'http://www.tapeswitch.com/index.html' },
                {
                    title: 'Tapeswitch Quick References',
                    link: '/tapeswitch-quick-references',
                    isInternal: true
                }
            ],
        },
    ],
};