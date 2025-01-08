# zlabwiki

## Overview
Welcome to the zlabwiki github! This repo contains the source code for the zlab wiki, which is a collection of guides and tutorials for navigating the Zlab computing environment. The wiki is built using the [MyST](https://github.com/jupyter-book/mystmd) framework, which allows for seamless integration of markdown and jupyter notebooks.

## Getting Started

### Prerequisites:
```bash
python ^3.13
```

### Installation
1. Clone the repository:
```bash
git clone https://github.com/christian728504/zlabwiki.git
cd zlabwiki
```

2. Install dependencies:
```bash
poetry install
```

4. Start the local development server:
```bash
poetry run myst start
```

## Project Structure
```
├── README.md
├── _build
│   ├── cache
│   ├── html
│   ├── site
│   └── templates
├── ascii_logo.txt
├── computing_resources.md
├── dark_logo.png
├── favicon.ico
├── getting_started.md
├── images
├── learning_resources.md
├── light_logo.png
├── myst.yml
├── poetry.lock
├── pyproject.toml
└── root.md
```

## Contributing

We follow a branch-based development workflow with automated deployments. When changes are merged to the main branch, they are automatically deployed to the production environment.

### Development Workflow

1. Fork the repository to your own GitHub account.
2. Create a feature branch from main:
```bash
git checkout -b labusername/feature
```

3. Make your changes and commit them with descriptive messages:
```bash
git commit -am 'Added feature: Brief description of changes'
```

4. Push your changes to your forked repository:
```bash
git push origin labusername/feature
```

5. Submit a Pull Request from your feature branch to the master branch.
6. Wait for the automated tests to complete and address any feedback.
7. Once approved and merged, your changes will automatically deploy to production.

### Best Practices

- Keep your feature branch up to date with master to minimize merge conflicts
- Write clear commit messages that describe your changes
- Reference any related issues in your Pull Request

### Continuous Deployment

Our repository is configured with automated deployment pipelines:
- Merges to master trigger automatic deployment
- Deploy status can be monitored in the repository's Actions tab

## License
This project is licensed under the [MIT License](https://github.com/christian728504/zlabwiki/blob/main/LICENSE).

## Contact
- Project Maintainer: Christian Samuel Ramirez
- Email: [christian.ramirez1@umassmed.edu](mailto:christian.ramirez1@umassmed.edu)
- Project Link: https://github.com/christian728504/zlabwiki

## Acknowledgments
- [Greg Andrews](https://github.com/grandrews7)
- [MyST](https://github.com/jupyter-book/mystmd) for providing the foundation for this wiki.
- [weng-lab](https://github.com/weng-lab) for providing the inpiration, training and technical support make this wiki.