import urllib.request
import struct

def get_webp_dimensions(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        data = response.read(30)
        if data[0:4] == b'RIFF' and data[8:12] == b'WEBP':
            if data[12:16] == b'VP8 ':
                width, height = struct.unpack('<HH', data[26:30])
                width = width & 0x3fff
                height = height & 0x3fff
            elif data[12:16] == b'VP8L':
                b = data[21:25]
                width = 1 + (((b[1] & 0x3f) << 8) | b[0])
                height = 1 + (((b[3] & 0x0f) << 10) | (b[2] << 2) | ((b[1] & 0xc0) >> 6))
            elif data[12:16] == b'VP8X':
                width = 1 + struct.unpack('<I', data[24:27] + b'\x00')[0]
                height = 1 + struct.unpack('<I', data[27:30] + b'\x00')[0]
            else:
                return "Unknown WEBP format"
            return f"{width}x{height} (Ratio: {width/height:.2f})"
    return "Not a valid WEBP"

urls = {
    "Logo": "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Keshvi-Beauty-Lounge-Logo/1.webp",
    "Poster": "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/KBL-Signature-Packages-Collection-Posters/15.webp",
    "Carousel": "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Carousel/KBL-Carousel-1-TextureVsCakey-Bridal-Authority/1.webp",
    "Reel": "https://cdn.jsdelivr.net/gh/vanshdigitals/Vanshdigitals-Assets@main/optimized/Keshvi-Beauty-Lounge/Reel-Cover/KBL-Mehendi-Portfolio-Reel-Cover-01.webp"
}

for name, url in urls.items():
    print(f"{name}: {get_webp_dimensions(url)}")
