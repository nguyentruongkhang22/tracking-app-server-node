cd ./fe
npm run build
rm -rf ../be/dist
mv ./dist ../be/dist
cd ../be
npm run start
