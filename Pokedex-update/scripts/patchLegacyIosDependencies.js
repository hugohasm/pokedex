const fs = require('fs');
const path = require('path');

const patchFile = ({filePath, isPatched, patch, warning}) => {
  if (!fs.existsSync(filePath)) {
    return false;
  }

  const contents = fs.readFileSync(filePath, 'utf8');

  if (isPatched(contents)) {
    return false;
  }

  const patchedContents = patch(contents);

  if (patchedContents === contents) {
    console.warn(warning);
    return false;
  }

  fs.writeFileSync(filePath, patchedContents);
  return true;
};

const boostPodspecPath = path.resolve(
  __dirname,
  '../node_modules/react-native/third-party-podspecs/boost.podspec',
);
const legacyBoostUrl =
  'https://boostorg.jfrog.io/artifactory/main/release/1.76.0/source/boost_1_76_0.tar.bz2';
const boostArchiveUrl =
  'https://archives.boost.io/release/1.76.0/source/boost_1_76_0.tar.bz2';

const boostPatched = patchFile({
  filePath: boostPodspecPath,
  isPatched: contents => contents.includes(boostArchiveUrl),
  patch: contents => contents.replace(legacyBoostUrl, boostArchiveUrl),
  warning: 'Boost podspec URL was not recognized; no patch was applied.',
});

const vectorIconsPodspecPath = path.resolve(
  __dirname,
  '../node_modules/react-native-vector-icons/RNVectorIcons.podspec',
);
const vectorIconsSourceFiles =
  "  s.source_files   = 'RNVectorIconsManager/**/*.{h,m,mm,swift}'";
const reactCoreDependency = '  s.dependency "React-Core"';

const vectorIconsPatched = patchFile({
  filePath: vectorIconsPodspecPath,
  isPatched: contents => contents.includes(reactCoreDependency),
  patch: contents =>
    contents.replace(
      vectorIconsSourceFiles,
      `${vectorIconsSourceFiles}\n${reactCoreDependency}`,
    ),
  warning:
    'RNVectorIcons podspec layout was not recognized; no patch was applied.',
});

if (boostPatched || vectorIconsPatched) {
  console.log('Prepared legacy iOS dependencies for CocoaPods.');
}
