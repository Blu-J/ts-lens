# Modified from the shell referenced in https://github.com/prettier/prettier
changedFiles=$(git diff --cached --name-only --diff-filter=ACM | grep '\.[tj]sx\?$' | tr '\n' ' ')
[ -z "$changedFiles" ] && exit 0

# Fix all the files with lint
echo "$changedFiles" | xargs ./node_modules/.bin/tslint -c tslint.json --exclude 'src/**/*.d.ts' --fix
tslintExitCode=$?

# Exit with bad code for the tslint
if [ $tslintExitCode -ne 0 ]
then
  exit $tslintExitCode
fi

# Prettify all staged .js files
echo "$changedFiles" | xargs ./node_modules/.bin/prettier --write
prettierExitCode=$?

# Exit with bad code for the prettier
if [ $prettierExitCode -ne 0 ]
then
  exit $prettierExitCode
fi

# Add back the modified/prettified files to staging
echo "$changedFiles" | xargs git add

exit 0
