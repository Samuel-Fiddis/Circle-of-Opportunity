read -rsp $'Copy files from local keystore to app keystore (y/n)?\n' ans
case $ans in
    y|Y|yes|yes) cp -u -v -R ~/.ethereum/testnet/keystore/ ./ ;;
esac
read -rsp $'Copy files from app keystore to local keystore (y/n)?\n' ans
case $ans in
    y|Y|yes|yes) cp -u -v -R ./keystore ~/.ethereum/testnet/ ;;
esac
