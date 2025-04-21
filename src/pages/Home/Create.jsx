import CreateTemplate from "@/components/Create/CreateTemplate";

export default function Create() {
  return (
    <div>
      <CreateTemplate
        structType="cardVersion"
        nowHasOptionTitle="目前已有卡片版本"
        addOptionTitle="想新增的卡片版本"
        isDivider
      />
      <CreateTemplate
        structType="languageType"
        nowHasOptionTitle="目前已有語言選項"
        addOptionTitle="想新增的語言"
        isDivider
      />
      <CreateTemplate
        structType="identificationType"
        nowHasOptionTitle="目前已有鑑定選項"
        addOptionTitle="想新增的鑑定選項"
        isDivider
      />
    </div>
  );
}
