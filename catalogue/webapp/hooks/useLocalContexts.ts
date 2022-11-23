type LocalContextProject = {
  uniqueId: string;
  projectPage: string;
  title: string;
  projectPrivacy: 'Public' | 'Private';
  dateAdded: Date;
  dateModified: Date;
  createdBy: any;
  notice: any;
};
const useLocalContexts = async (
  projectId: string
): Promise<LocalContextProject> => {
  const data = await fetch(
    `https://localcontextshub.org/api/v1/projects/${projectId}`
  );
  const json = await data.json();

  return {
    uniqueId: json.unique_id,
    projectPage: json.project_page,
    title: json.title,
    projectPrivacy: json.project_privacy,
    dateAdded: json.dateAdded,
    dateModified: json.dateModified,
    createdBy: json.created_by,
    notice: json.notice,
  };
};

export default useLocalContexts;
