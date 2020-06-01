#!/usr/bin/env sh

TRANSLATION_TEST_DIR='.translations_test'

rm -rf ${TRANSLATION_TEST_DIR} || exit 1
cp -r public/locales ${TRANSLATION_TEST_DIR} || exit 1
yarn build:translations -s -o "${TRANSLATION_TEST_DIR}/\$LOCALE/\$NAMESPACE.json" || exit 1
diff -r public/locales ${TRANSLATION_TEST_DIR} || exit 1
