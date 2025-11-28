from typing import Dict, Any

def tag_subscription_tool(context: Dict[str, Any], args: Dict[str, Any]) -> Dict[str, Any]:
    expenses = context.get('expenses', [])
    threshold = int(args.get('threshold_count', 2))
    counts = {}
    for e in expenses:
        desc = (e.get('description') or '').lower()
        if not desc: continue
        counts[desc] = counts.get(desc, 0) + 1
    tags = []
    for desc, cnt in counts.items():
        if cnt >= threshold:
            tags.append({'description': desc, 'count': cnt, 'tag': 'subscription'})
    return {'tags': tags}
