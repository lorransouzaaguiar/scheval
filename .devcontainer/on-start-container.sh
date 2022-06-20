#init git autmatically
HAS_GIT_PATH="/scheval/.git/"
if ! [ -d "$HAS_GIT_PATH" ]; then
  git init
fi

#copy my git global config to the path
cp -fr .devcontainer/.gitconfig /home/node/
