import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    "moduleFileExtensions": [
        "js",
        "json",
        "ts"
    ],
    "roots": [
        "<rootDir>",
    ],
    "modulePaths": [
        "<rootDir>",
    ],
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
        "**/*.(t|j)s"
    ],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node",
    moduleDirectories: ['node_modules', 'src']
};

export default config;