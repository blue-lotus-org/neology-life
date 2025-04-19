# Next Life

Next Life `biology-of-life` is an educational web application that leverages various modern knowledge of biology to create a robust and scalable web application. This application is provide an interactive and engaging learning experience.\
Our main goal is to provide a comprehensive and interactive learning experience for students and educators alike.

## Table of Contents
- [Core Features](#core-features)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

---

## Core Features:
- **Lifeform Generation**: Generate a unique lifeform concept based on the user-provided specifications and `hydrogen` as the primary element, without relying on existing biological knowledge. The AI tool uses a custom algorithm to 'evolve' new lifeforms, considering the properties of `hydrogen` and user inputs.
- **Lifeform Display**: Display the generated lifeform's characteristics, potential environment, and basic 'metabolism' in a structured format.
- **Parameter Input**: Allow users to input parameters such as environmental conditions (temperature, pressure, radiation levels) and desired traits for the lifeform.
- **Educational Content**: Provide a 'research' section with educational content about `hydrogen`, its properties, and its potential in supporting life.
- **Lifeform Animation**: Incorporate a simple animation showing a rudimentary 'lifecycle' or interaction of the generated lifeform with its environment. **`Future Feature, maybe with conterbutors`**.
- **`biology-of-life`** and/or **`neology-life`**: This edition (code name: `neology-life`) based on `hydrogen` as the primary element. `biology-of-life` not public yet for all users and based on earth life simulation. `biology-of-life` is the main project and in memory of **DARWiN**.

## Installation
To get started with `biology-of-life` or `neology-life`, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/blue-lotus-org/neology-life.git
   ```
2. Navigate to the project directory:
   ```bash
   cd neology-life
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage
To run the development server, use the following command:
```bash
npm run dev
```

To build the project for production, use:
```bash
npm run build
```

To start the production server, use:
```bash
npm start
```

- You can use npm, pnpm, yarn, bun,...
- We use `genkit` for AI integration. You need to add google-ai apikey to `.env` file.

## Scripts
The following scripts are available in the package.json file:

- `dev`: Start the development server.
- `genkit:dev`: Start the Genkit development server.
- `genkit:watch`: Start the Genkit development server with watch mode.
- `build`: Build the project for production.
- `start`: Start the production server.
- `lint`: Lint the project.
- `typecheck`: Run TypeScript type checking.

## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT, Apache2 Licenses. Free and Opensource, feel free to use, change, contribute and share.

## Credits
- [BLUE LOTUS](https://lotuschain.org)

## Disclaimer
This app was built for educational purposes and is not intended for production use. To use as a better experiences you need a knowledgebase of biology, chemistry, and couple other sciences. We are not responsible for any issues or damages that may occur from using this app. Use at your own risk.