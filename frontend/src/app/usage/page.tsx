import Image from "next/image";

export default function Usage() {
  return (
    <main className="p-4 max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">使い方</h2>
        <p>
          「ねこあるき」は、
          <br />
          地域で見かけた猫の情報を投稿し、
          <br />
          地図上で可視化する Web アプリケーションです。
          <br />
          ユーザーが見つけた猫の写真・特徴・位置情報を
          <br />
          記録し、地域の猫スポットを共有することを
          <br />
          目的としています。
        </p>

        <section className="my-8 p-4 rounded-lg border border-base-300 bg-base-100">
          <h3 className="text-xl font-semibold mb-3">目次</h3>
          <ul className="mx-auto w-fit space-y-3 text-left">
            <li>
              <a
                href="#map"
                className="flex items-center gap-2 link link-hover"
              >
                <span>マップの使い方</span>
                <span className="text-gray-400">›</span>
              </a>
            </li>
            <li>
              <a
                href="#timeline"
                className="flex items-center gap-2 link link-hover"
              >
                <span>タイムラインの見方</span>
                <span className="text-gray-400">›</span>
              </a>
            </li>
            <li>
              <a
                href="#post"
                className="flex items-center gap-2 link link-hover"
              >
                <span>写真の投稿方法</span>
                <span className="text-gray-400">›</span>
              </a>
            </li>
            <li>
              <a
                href="#guidelines"
                className="flex items-center gap-2 link link-hover"
              >
                <span>注意事項</span>
                <span className="text-gray-400">›</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
      <section className="py-6">
        <h3 id="map" className="text-xl font-semibold mb-4 scroll-mt-20">
          マップの使い方
        </h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            マップ上には、投稿された位置情報の場所にピンが表示されています。
          </li>
          <Image
            src="/images/usage_map_01.png"
            alt="マップ上には、投稿された位置情報の場所にピンが表示されています。"
            width={300}
            height={180}
            className="rounded-md"
          />
          <li>ピンをクリックして、投稿を確認できます。</li>
          <Image
            src="/images/usage_map_02.png"
            alt="ピンをクリックして、投稿を確認できます。"
            width={300}
            height={180}
            className="rounded-md"
          />
        </ol>
      </section>
      <section className="py-6 border-t border-base-300">
        <h3 id="timeline" className="text-xl font-semibold mb-4 scroll-mt-20">
          タイムラインの使い方
        </h3>
        <h4 className="text-xl font-semibold mb-4">投稿に関して</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>ハートマークをクリックして、猫をかわいいとマークできます。</li>
          <li>コメント欄で他ユーザーと投稿された猫を愛でることができます。</li>
          <li>
            「地図で見る」ボタンを押すと、マップ上に投稿された位置情報が表示されます。
          </li>
        </ul>
        <Image
          src="/images/usage_indivisual_post.png"
          alt="ハートマークをクリックして、猫をかわいいとマークできます。
          コメント欄で他ユーザーと投稿された猫を愛でることができます。
          「地図で見る」ボタンを押すと、マップ上に投稿された位置情報が表示されます。"
          width={300}
          height={180}
          className="rounded-md"
        />
        <h4 className="text-xl font-semibold mb-4 mt-4">タブに関して</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>
            「自分が投稿した猫」および「かわいいした猫」はログインしているユーザーのみが利用できます。
          </li>
          <li>「すべての猫」タブには、全ユーザーの投稿が表示されます。</li>
          <li>「自分が投稿した猫」タブには、自分の投稿が表示されます。</li>
          <li>
            「かわいいした猫」タブには、自分がかわいいした猫のみが表示されます。
          </li>
        </ul>
        <Image
          src="/images/usage_tabbar.png"
          alt="「自分が投稿した猫」および「かわいいした猫」はログインしているユーザーのみが利用できます。
          「すべての猫」タブには、全ユーザーの投稿が表示されます。
          「自分が投稿した猫」タブには、自分の投稿が表示されます。
          「かわいいした猫」タブには、自分がかわいいした猫のみが表示されます。"
          width={300}
          height={180}
          className="rounded-md"
        />
      </section>
      <section className="py-6 border-t border-base-300">
        <h3 id="post" className="text-xl font-semibold mb-4 scroll-mt-20">
          写真の投稿方法
        </h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            メインメニューまたは、「ホーム」ページ右下のボタンより、「投稿」ページに移動します。
          </li>
          <li>
            「画像をアップロードする」ボタンをクリックして、猫の写真を選択します。
          </li>
          <Image
            src="/images/usage_post_image.png"
            alt="「画像をアップロードする」ボタンをクリックして、猫の写真を選択します。"
            width={300}
            height={180}
            className="rounded-md"
          />
          <li>
            マップ上をクリックして、猫を見かけた場所の位置情報を設定します。
          </li>
          <Image
            src="/images/usage_post_map.png"
            alt="マップ上には、投稿された位置情報の場所にピンが表示されています。"
            width={300}
            height={180}
            className="rounded-md"
          />
          <li>コメント欄に写真の説明やエピソードを入力します。</li>
          <Image
            src="/images/usage_post_comment.png"
            alt="コメント欄に写真の説明やエピソードを入力します。"
            width={300}
            height={180}
            className="rounded-md"
          />
          <li>「投稿する」ボタンをクリックして、写真を共有します。</li>
        </ol>
      </section>
      <section className="px-4 py-4 mt-6 rounded-lg bg-base-200">
        <h3 id="guidelines" className="text-xl font-semibold mb-4 scroll-mt-20">
          注意事項
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            飼い猫につきましては、飼い主様の許可なく撮影することはお控えください。
          </li>
          <li>私有地には立ち入らないよう、十分ご注意ください。</li>
          <li>猫が驚かないよう、行動や声の大きさにご配慮ください。</li>
        </ul>
      </section>
    </main>
  );
}
