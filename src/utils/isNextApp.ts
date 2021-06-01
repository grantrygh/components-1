export function isNextApp() {
    return (process.env._ || '').endsWith('.bin/next');
}
