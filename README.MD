# Virtual Chat

|                 アキテクチャ                 |             入場             |
| :------------------------------------------: | :--------------------------: |
| ![architecture](./markdown/architecture.png) | ![main](./markdown/main.png) |
|                 アバター選択                 |         チャット画像         |
|       ![select](./markdown/select.png)       | ![room](./markdown/room.png) |

**自分の姿をアバターで表現できるコミュニケーションアプリ**

Tensorflow と OpenCV を使ってユーザーのモーションを認識します。  
その結果を WebSocket で転送し、ブラウザ上では WebGL で 3D アバターをレンダリングします。

## 実装機能

- 相手とアバター・音声・テキストを通じてコミュニティー
- アバターはユーザーの頭・目・口の動き、そして表情に   応じて動く
- 五つのアバター中で自分のアバターを選べる

## How to run

heroku のサーバーを利用する場合は１，２番を省略

1. npm run start-react
2. npm run start-server
3. cd python
4. python ./start.py 　// ライブラリインストール必要
5. カメラ ID（大体１）, ユーザーネーム、ルーム番号入力
6. 最後に Local サーバーの場合は Y、デプロイサーバーの場合は N を入力

## Deploy

[フロントエンドのデプロイリンク](https://virtual-chat-aio.herokuapp.com)

無料サーバーを使っているため最初の接続の時は時間がかかります。(Cold Start)

## 技術スタック

<div align="center">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white">
    <img src="https://img.shields.io/badge/NodeJS-339933?style=for-the-badge&logo=node.js&logoColor=white">
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
    <img src="https://img.shields.io/badge/Chakra UI-319795?style=for-the-badge&logo=Chakra UI&logoColor=white">
    <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=Three.js&logoColor=white">
    <img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=TensorFlow&logoColor=white">
    <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=Socket.io&logoColor=white">
    <img src="https://img.shields.io/badge/Framer Motion-0055FF?style=for-the-badge&logo=Framer&logoColor=white">
    <img src="https://img.shields.io/badge/Express.js-efd81c?style=for-the-badge&logo=Express&logoColor=white">
    <img src="https://img.shields.io/badge/heroku-430098?style=for-the-badge&logo=heroku&logoColor=white">
</div>

## Reference

### TF モデル

- Face Analysis - https://github.com/deepinsight/insightface
- Emotion - https://github.com/omar178/Emotion-recognition
- Face Detection - https://github.com/deepinsight/insightface
- Laser-Eye - https://github.com/1996scarlet/Laser-Eye
- Head-Pose - https://github.com/1996scarlet/Dense-Head-Pose-Estimation

### 3D Model

- YYB Miku - https://bowlroll.net/file/146083
- Tda Kizuna ai - ai https://kizunaai.com/en/download/
- Sour rin - https://bowlroll.net/file/155105
- TDA Miku - https://bowlroll.net/file/4576
- TOFU - https://bowlroll.net/file/246787
