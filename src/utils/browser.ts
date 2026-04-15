export class BrowserUtils {
    static isSafari(): boolean {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }

    static isMobile(): boolean {
        return /webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    static isSafariOrMobile(): boolean {
        return this.isSafari() || this.isMobile();
    }

    static isChrome(): boolean {
        return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    }

    static getOS(): string {
        const userAgent = navigator.userAgent;
        
        if (/iPad|iPhone|iPod/.test(userAgent) && !(window as unknown as Record<string, unknown>).MSStream) {
            return 'iOS';
        }
        if (/android/i.test(userAgent)) {
            return 'Android';
        }
        if (/Mac/i.test(navigator.platform)) {
            return 'macOS';
        }
        if (/Win/i.test(navigator.platform)) {
            return 'Windows';
        }
        if (/Linux/i.test(navigator.platform)) {
            return 'Linux';
        }
        
        return 'Unknown';
    }
}