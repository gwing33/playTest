# Play Test

Setting up React in a Play! Framework.
Would like to get WebPack, node and various packages working with Play.

## Setup

**Build the Dev Image**
```bash
docker build -t playtest_dev -f Dockerfile.dev .
```

**Build out the project**
```bash
docker run -it -p 9000:9000 -v $(pwd)/play/:/root/ playtest_dev build
```
_Note: replace ``build`` with ``./activator`` if you are doing development._

**Build the Production Image**
```bash
docker build -t playtest .
```

**Run the Application**
```bash
docker run -d -p 9000:9000 playtest run
```
