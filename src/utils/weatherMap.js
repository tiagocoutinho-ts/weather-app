import DrizzleIcon from '../assets/images/icon-drizzle.webp';
import FogIcon from '../assets/images/icon-fog.webp';
import OvercastIcon from '../assets/images/icon-overcast.webp';
import PartlyCloudyIcon from '../assets/images/icon-partly-cloudy.webp';
import RainIcon from '../assets/images/icon-rain.webp';
import SnowIcon from '../assets/images/icon-snow.webp';
import StormIcon from '../assets/images/icon-storm.webp';
import SunnyIcon from '../assets/images/icon-sunny.webp';


export const weatherIconMap = {
    // ☀️ Céu Limpo
    0: SunnyIcon, 
    
    // 🌤️ Parcialmente Nublado, Nublado
    1: PartlyCloudyIcon,
    2: PartlyCloudyIcon,    
    3: OvercastIcon, // Mudei para Overcast aqui, já que você o tem
    
    // 🌫️ Névoa
    45: FogIcon,
    48: FogIcon,
    
    // 🌧️ Chuvisco
    51: DrizzleIcon,
    53: DrizzleIcon,
    55: DrizzleIcon,
    
    // 💧 Chuva
    61: RainIcon,
    63: RainIcon,
    65: RainIcon,
    80: RainIcon,
    81: RainIcon,
    82: RainIcon,
    
    // ❄️ Neve
    71: SnowIcon,
    73: SnowIcon,
    75: SnowIcon,
    85: SnowIcon,
    86: SnowIcon,
    
    // ⛈️ Tempestade
    95: StormIcon,
    96: StormIcon, 
    99: StormIcon
};

const iconurl = weatherIconMap["48"]
console.log(iconurl)