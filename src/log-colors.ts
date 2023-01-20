import chalk from 'chalk'

export interface LogColors {
    info: (text: string) => void;
    success: (text: string) => void;
    error: (text: string) => void;
    highlight: (text: string) => void;
    default?: (text: string) => void;
}

const colors = {
    yellow: chalk.yellow,
    red: chalk.red,
    green: chalk.green,
    magenta: chalk.magenta,
}

const logs = (): LogColors => {
    const info = (text: string) => {
        console.log(colors.yellow(text))
    }

    const error = (text: string) => {
        console.log(colors.red(text))
    }

    const success = (text: string) => {
        console.log(colors.green(text))
    }

    const log = (text: string) => {
        console.log(text)
    }

    const highlight = (text: string) => {
        console.log(colors.magenta(text))
    }

    return {
        info,
        error,
        success,
        highlight,
        default: log,
    }
}

export default logs
export {colors}