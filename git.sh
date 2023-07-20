read -p "Github username: " USERNAME
read -p "Github repository's name: " REPO_NAME

TOKEN1=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
TOKEN2=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


case $USERNAME in
    nguyentruongkhang22)
        TOKEN=$TOKEN1
        ;;

    khangnt-coin98)
        TOKEN=$TOKEN2
        ;;
    *)
        echo "Invalid username."
        # code to execute if none of the above patterns match expression
        exit 0
        ;;
esac

text="\n[remote "origin"]
	url = https://$USERNAME:$TOKEN/$USERNAME/$REPO_NAME.git
	fetch = +refs/heads/*:refs/remotes/origin/*"

echo "$text" >> ./.git/config