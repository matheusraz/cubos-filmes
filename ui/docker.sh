echo "Digite a versão da imagem: "
read VERSION

npm run build:prod
sudo docker build -t matraz/cubos-front:$VERSION . --no-cache
sudo docker push matraz/cubos-front:$VERSION