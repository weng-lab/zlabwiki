 docker run --rm -v "$(pwd):/data" pandoc/extra server_usage_guidelines.md -o server_usage_guidelines.pdf --template eisvogel --listings
