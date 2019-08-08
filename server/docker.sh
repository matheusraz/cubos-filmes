echo "Digite a versão da imagem: "
read VERSION

sudo docker build -t matraz/cubos-back:$VERSION . --no-cache
sudo docker push matraz/cubos-back:$VERSION