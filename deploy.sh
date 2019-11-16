repo1=../$1/dist/
branch=$2
cd $repo1 && cp -rf $repo1 && git checkout $branch
# git add . && git commit -m 'deploy'  && git push -u origin $branch && git checkout master