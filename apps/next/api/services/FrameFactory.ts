export class DelegateFrameFactory {
  #framePostUrl: string;
  #templateHtml: string;
  #baseUrl: string;
  #address: string;
  constructor(baseUrl: string, address: string) {
    this.#address = address;
    this.#baseUrl = baseUrl;
    this.#framePostUrl = `${baseUrl}/api/delegates/generate-frame?address=${address}`;

    this.#templateHtml = `<!DOCTYPE html>
		  <html>
		  <head>
			<meta name="fc:frame" content="vNext" />
			<meta name="fc:frame:image:aspect_ratio" content="1.91:1" />

			{{dynamicContent}}


			  <meta name="fc:frame:button:3" content="Delegate" />
			  <meta name="fc:frame:button:3:action" content="link" />
			  <meta
			  name="fc:frame:button:3:target"
			  content="https://www.tally.xyz/profile/${this.#address}"
			  />
		  </head>
		  </html
		  `;
  }

  get frame1() {
    const frameImageSrc = `${this.#baseUrl}/api/delegates/images/1?address=${this.#address}`;
    return this.#templateHtml.replace(
      "{{dynamicContent}}",
      `
	  <meta property="og:image" content="${frameImageSrc}" />

	  <meta name="fc:frame:image" content="${frameImageSrc}" />

	  <meta name="fc:frame:button:1" content="Statement →" />
	  <meta name="fc:frame:button:1:action" content="post" />
	  <meta
	  name="fc:frame:post_url"
	  content="${this.#framePostUrl}&currentIndex=1"
	/>

	  <meta name="fc:frame:button:2" content="Participation →→" />
	  <meta name="fc:frame:button:2:action" content="post" />

	  <meta
		name="fc:frame:post_url"
		content="${this.#framePostUrl}&currentIndex=1"
	  />
	  `,
    );
  }
  get frame2() {
    const frameImageSrc = `${this.#baseUrl}/api/delegates/images/2?address=${this.#address}`;
    return this.#templateHtml.replace(
      "{{dynamicContent}}",
      `
	  <meta property="og:image" content="${frameImageSrc}" />

	  <meta name="fc:frame:image" content="${frameImageSrc}" />
	  <meta name="fc:frame:button:1" content="← About" />
	  <meta name="fc:frame:button:1:action" content="post" />

	  <meta name="fc:frame:button:2" content="Participation →" />
	  <meta name="fc:frame:button:2:action" content="post" />

	  <meta
		name="fc:frame:post_url"
		content="${this.#framePostUrl}&currentIndex=2"
	  />
	  `,
    );
  }

  get frame3() {
    const frameImageSrc = `${this.#baseUrl}/api/delegates/images/3?address=${this.#address}`;
    return this.#templateHtml.replace(
      "{{dynamicContent}}",
      `
	  <meta property="og:image" content="${frameImageSrc}" />

	  <meta name="fc:frame:image" content="${frameImageSrc}" />
	  <meta name="fc:frame:button:1" content="←← About" />
	  <meta name="fc:frame:button:1:action" content="post" />

	  <meta name="fc:frame:button:2" content="← Participation" />
	  <meta name="fc:frame:button:2:action" content="post" />

	  <meta
		name="fc:frame:post_url"
		content="${this.#framePostUrl}&currentIndex=3"
	  />
	  `,
    );
  }
}
