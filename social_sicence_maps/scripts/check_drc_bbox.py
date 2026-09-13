import json

with open('scripts/map_data_final.json') as f:
    d = json.load(f)

import re

drc_regions = d['drc_regions']
all_xs, all_ys = [], []
for r in drc_regions:
    nums = [float(x) for x in re.findall(r'[-+]?\d*\.?\d+', r['path'])]
    xs = nums[0::2]
    ys = nums[1::2]
    all_xs.extend(xs)
    all_ys.extend(ys)
    print(f"{r['name']}: Center=({sum(xs)/len(xs):.1f}, {sum(ys)/len(ys):.1f})")

min_x, max_x = min(all_xs), max(all_xs)
min_y, max_y = min(all_ys), max(all_ys)
print(f"\nTotal DRC bbox: X {min_x:.0f}..{max_x:.0f} (span {max_x-min_x:.0f}), Y {min_y:.0f}..{max_y:.0f} (span {max_y-min_y:.0f})")

# Check Saudi bounds too
all_xs, all_ys = [], []
for r in d['saudi_regions']:
    nums = [float(x) for x in re.findall(r'[-+]?\d*\.?\d+', r['path'])]
    xs = nums[0::2]
    ys = nums[1::2]
    all_xs.extend(xs)
    all_ys.extend(ys)

min_x, max_x = min(all_xs), max(all_xs)
min_y, max_y = min(all_ys), max(all_ys)
print(f"\nTotal Saudi bbox: X {min_x:.0f}..{max_x:.0f} (span {max_x-min_x:.0f}), Y {min_y:.0f}..{max_y:.0f} (span {max_y-min_y:.0f})")
