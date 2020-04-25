# Composita Webpage

This repository provides the sources for the Composita website.

To build and deploy the page use the following [Docker](https://www.docker.com/) command:

    docker run --rm -it -v $(pwd):/srv/jekyll -p 127.0.0.1:4000:4000 jekyll/jekyll:pages jekyll serve

## License

[0BSD](LICENSE.txt)

