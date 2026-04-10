#!/bin/bash
# Generate all product and cover images via Kie.ai Flux Kontext Pro API
# Usage: bash scripts/generate-images.sh

API_KEY="a34ec7e113fd3f211e45fc9c44ecaabb"
BASE="https://api.kie.ai/api/v1/flux/kontext"

# Track task IDs
declare -A TASKS

submit() {
  local filename="$1"
  local prompt="$2"
  local ratio="${3:-1:1}"

  echo "Submitting: $filename"
  local resp
  resp=$(curl -s -X POST "$BASE/generate" \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"prompt\": \"$prompt\",
      \"aspectRatio\": \"$ratio\",
      \"outputFormat\": \"jpeg\",
      \"model\": \"flux-kontext-pro\",
      \"safetyTolerance\": 2
    }" 2>&1)

  local taskId
  taskId=$(echo "$resp" | python3 -c "import sys,json; print(json.loads(sys.stdin.read())['data']['taskId'])" 2>/dev/null)

  if [ -n "$taskId" ]; then
    TASKS["$filename"]="$taskId"
    echo "  -> Task: $taskId"
  else
    echo "  -> FAILED: $resp"
  fi
}

poll_and_download() {
  local filename="$1"
  local taskId="$2"
  local output_path="$3"
  local max_tries=30

  for i in $(seq 1 $max_tries); do
    local resp
    resp=$(curl -s "$BASE/record-info?taskId=$taskId" \
      -H "Authorization: Bearer $API_KEY" 2>&1)

    local flag
    flag=$(echo "$resp" | python3 -c "import sys,json; print(json.loads(sys.stdin.read())['data']['successFlag'])" 2>/dev/null)

    if [ "$flag" = "1" ]; then
      local url
      url=$(echo "$resp" | python3 -c "import sys,json; print(json.loads(sys.stdin.read())['data']['response']['resultImageUrl'])" 2>/dev/null)
      if [ -n "$url" ]; then
        curl -s -o "$output_path" "$url"
        echo "  Downloaded: $output_path"
        return 0
      fi
    elif [ "$flag" = "2" ] || [ "$flag" = "3" ]; then
      echo "  FAILED: $filename (flag=$flag)"
      return 1
    fi
    sleep 5
  done
  echo "  TIMEOUT: $filename"
  return 1
}

echo "=== Generating Product Images ==="

submit "hatch-restore-2.jpg" \
  "Minimalist product photo of a modern smart sunrise alarm clock, rounded white design with warm amber LED glow, sitting on a dark wood nightstand, moody dark bedroom background, editorial product photography, soft shadows, premium feel" "1:1"

submit "yogasleep-dohm.jpg" \
  "Minimalist product photo of a round white noise machine with a smooth dome shape, subtle air vents around the middle, sitting on a dark nightstand, moody dark bedroom, editorial product photography, clean simple design" "1:1"

submit "loftie-clock.jpg" \
  "Minimalist product photo of a modern small rectangular bedside alarm clock with a minimal LED display, light beige housing, on a dark nightstand, moody dark bedroom, editorial product photography" "1:1"

submit "magnesium-breakthrough.jpg" \
  "Minimalist product photo of a dark supplement bottle with a gold label reading Magnesium, white capsules scattered beside it, dark surface, moody studio lighting, editorial health product photography" "1:1"

submit "manta-sleep-mask.jpg" \
  "Minimalist product photo of a black sleep mask with adjustable eye cups, laid flat on a dark surface, moody studio lighting, editorial product photography, showing the contoured design" "1:1"

submit "chilipad-cube.jpg" \
  "Minimalist product photo of a small white bedside cooling unit about the size of a lunchbox with water reservoir, connected to a thin mattress pad with tubes, dark bedroom setting, editorial product photography" "1:1"

submit "oura-ring-gen-3.jpg" \
  "Minimalist product photo of a sleek titanium smart ring, silver metallic finish, subtle sensor dots on the inner band, resting on a dark stone surface, moody studio lighting, editorial jewelry photography" "1:1"

submit "whoop-4.jpg" \
  "Minimalist product photo of a slim black fitness strap wearable on a wrist, simple black fabric band with a small rectangular sensor module, dark background, editorial fitness product photography" "1:1"

submit "swanwick-blue-blockers.jpg" \
  "Minimalist product photo of amber-tinted blue light blocking glasses with a classic frame shape, warm orange lenses, resting on a dark surface, moody studio lighting, editorial eyewear photography" "1:1"

submit "ra-optics-twilight.jpg" \
  "Minimalist product photo of premium wraparound blue light blocking glasses with deep amber lenses and a dark frame, resting on a dark surface, editorial eyewear photography, premium feel" "1:1"

submit "bearaby-cotton-napper.jpg" \
  "Minimalist product photo of a chunky knit weighted blanket in natural cream cotton, draped over a dark bed corner, showing the thick braided knit texture, moody bedroom, editorial textile photography" "1:1"

submit "luna-weighted-blanket.jpg" \
  "Minimalist product photo of a folded gray weighted blanket on a dark bed, smooth cotton surface with visible quilted squares, moody bedroom lighting, editorial textile photography" "1:1"

submit "coop-eden-pillow.jpg" \
  "Minimalist product photo of a plush white memory foam pillow with a soft bamboo cover, sitting on a dark bed surface, moody bedroom lighting, editorial bedding photography" "1:1"

submit "beckham-hotel-pillow.jpg" \
  "Minimalist product photo of two plush white hotel-style pillows stacked on a dark bed, fluffy and inviting, moody bedroom lighting, editorial bedding photography" "1:1"

echo ""
echo "=== Generating Cover Images ==="

submit "smart-alarm-clocks.jpg" \
  "Editorial hero image of a modern bedroom nightstand at dawn, warm sunrise light streaming through sheer curtains, a smart alarm clock glowing on the nightstand, peaceful and calm atmosphere, wide cinematic composition" "16:9"

submit "best-magnesium.jpg" \
  "Editorial hero image of supplement capsules and a glass of water on a dark marble surface, soft warm evening lighting, calming purple and blue tones, cinematic health photography" "16:9"

submit "best-sleep-trackers.jpg" \
  "Editorial hero image of a sleeping person's hand on a white pillow wearing a smart ring, soft morning light, peaceful bedroom, cinematic composition, muted tones" "16:9"

submit "best-blue-blockers.jpg" \
  "Editorial hero image of amber-tinted glasses resting on an open book next to a warm table lamp at night, cozy evening reading atmosphere, cinematic composition" "16:9"

submit "best-weighted-blankets.jpg" \
  "Editorial hero image of a cozy bed with a chunky knit blanket draped over it, warm dim lamplight, peaceful bedroom atmosphere, cinematic composition, muted warm tones" "16:9"

submit "best-pillows.jpg" \
  "Editorial hero image of fresh white pillows on a neatly made dark bed, soft morning light from a window, peaceful and inviting, cinematic composition" "16:9"

submit "hatch-restore-2-review.jpg" \
  "Editorial hero image of a sunrise alarm clock glowing with warm amber light on a nightstand in a dark bedroom, peaceful dawn atmosphere, cinematic lighting" "16:9"

submit "manta-sleep-mask-review.jpg" \
  "Editorial hero image of a black eye-cup sleep mask laid on a white pillow, dark bedroom with soft blue moonlight through curtains, cinematic composition" "16:9"

submit "loftie-clock-review.jpg" \
  "Editorial hero image of a minimalist bedside clock on a nightstand next to a book, warm evening lamp light, phone nowhere in sight, peaceful bedroom, cinematic" "16:9"

submit "chilipad-cube-review.jpg" \
  "Editorial hero image of a cool blue-tinted bedroom at night, a bed with thin cooling pad visible under white sheets, serene and temperature-controlled atmosphere, cinematic" "16:9"

submit "oura-ring-review.jpg" \
  "Editorial hero image of a hand wearing a sleek smart ring resting on a white pillow, soft morning light, minimalist peaceful bedroom, cinematic composition" "16:9"

submit "yogasleep-dohm-review.jpg" \
  "Editorial hero image of a round white noise machine on a nightstand in a dark bedroom, soft warm glow from a lamp, peaceful sleeping atmosphere, cinematic" "16:9"

submit "fix-sleep-schedule.jpg" \
  "Editorial hero image of bright morning sunlight flooding through a bedroom window onto an empty bed, fresh start energy, cinematic warm tones" "16:9"

submit "bedroom-temperature.jpg" \
  "Editorial hero image of a cool-toned bedroom with a modern thermostat on the wall showing 65F, peaceful sleeping atmosphere, blue-tinted moonlight, cinematic" "16:9"

submit "sleep-better-tonight.jpg" \
  "Editorial hero image of a peaceful person sleeping deeply in a dark cool bedroom, soft moonlight, premium bedding, cinematic composition, tranquil" "16:9"

submit "3-am-wake-up.jpg" \
  "Editorial hero image of a dark bedroom with a digital clock showing 3:00 AM in soft red numbers, moonlight through curtains, empty bed with rumpled sheets, moody cinematic" "16:9"

submit "melatonin-dosage.jpg" \
  "Editorial hero image of a small supplement capsule next to a glass of water on a dark nightstand at dusk, warm purple and orange sunset light through window, cinematic" "16:9"

submit "napping-science.jpg" \
  "Editorial hero image of a person napping on a couch in afternoon sunlight, warm golden tones, a book resting on their chest, peaceful and restorative atmosphere, cinematic" "16:9"

submit "sleep-apnea-signs.jpg" \
  "Editorial hero image of a stethoscope resting on a white pillow, dark moody bedroom lighting, medical meets sleep theme, cinematic composition" "16:9"

submit "caffeine-and-sleep.jpg" \
  "Editorial hero image of a coffee cup on a saucer next to an alarm clock on a nightstand, the coffee is half-drunk, warm afternoon light, the clock shows late afternoon, cinematic" "16:9"

submit "bedtime-routine.jpg" \
  "Editorial hero image of a warm dimly lit bedroom at night, a book and reading glasses on the nightstand, warm lamp light, candle flickering, phone absent, cinematic peaceful" "16:9"

submit "sleep-debt.jpg" \
  "Editorial hero image of rumpled empty bed sheets with morning light streaming in, an alarm clock in the background, exhaustion theme, cinematic muted tones" "16:9"

echo ""
echo "=== All ${#TASKS[@]} tasks submitted. Waiting for results... ==="
echo ""

# Wait and download all
sleep 30

mkdir -p public/images/products public/images/covers

# Product images
for name in hatch-restore-2 yogasleep-dohm loftie-clock magnesium-breakthrough manta-sleep-mask chilipad-cube oura-ring-gen-3 whoop-4 swanwick-blue-blockers ra-optics-twilight bearaby-cotton-napper luna-weighted-blanket coop-eden-pillow beckham-hotel-pillow; do
  key="${name}.jpg"
  taskId="${TASKS[$key]}"
  if [ -n "$taskId" ]; then
    poll_and_download "$key" "$taskId" "public/images/products/${key}"
  fi
done

# Cover images
for name in smart-alarm-clocks best-magnesium best-sleep-trackers best-blue-blockers best-weighted-blankets best-pillows hatch-restore-2-review manta-sleep-mask-review loftie-clock-review chilipad-cube-review oura-ring-review yogasleep-dohm-review fix-sleep-schedule bedroom-temperature sleep-better-tonight 3-am-wake-up melatonin-dosage napping-science sleep-apnea-signs caffeine-and-sleep bedtime-routine sleep-debt; do
  key="${name}.jpg"
  taskId="${TASKS[$key]}"
  if [ -n "$taskId" ]; then
    poll_and_download "$key" "$taskId" "public/images/covers/${key}"
  fi
done

echo ""
echo "=== Done! ==="
ls -la public/images/products/ public/images/covers/
